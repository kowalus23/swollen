// app/api/reminders/route.js
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

// Create Supabase client lazily to avoid build-time execution
const getSupabaseClient = () => {
	return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY);
};

// adres frontendu (link do aplikacji)
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function GET() {
	const supabase = getSupabaseClient();

	// 1. pobierz wszystkie nie‐wysłane
	const { data, error } = await supabase.from("campaign_reminders").select("*").eq("sent", false);

	if (error) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const today = DateTime.now().toISODate();
	const toSend = data.filter((rec) => {
		const campaignStartDate = DateTime.fromISO(rec.campaign_start_at);
		const sendDate = campaignStartDate.minus({ days: rec.days_before }).toISODate();
		return sendDate === today;
	});

	// 2. dla każdego wysyłamy maila przez Twój /api/send-email
	for (const rec of toSend) {
		const subject = `Przypomnienie o premierze kolekcji ${rec.campaign_name}`;
		const text = `
Cześć!

Przypomnienie o premierze kolekcji "${rec.campaign_name}" odbędzie się ${rec.campaign_start_at}.
Sprawdź aplikację: ${APP_URL}
    `.trim();
		const html = `
      <p>Cześć!</p>
      <p>Przypomnienie o premierze kolekcji <strong>${rec.campaign_name}</strong> odbędzie się <strong>${rec.campaign_start_at}</strong>.</p>
      <p><a href="${APP_URL}" target="_blank" rel="noopener">Przejdź do aplikacji</a></p>
    `.trim();

		try {
			const res = await fetch(`api/send-email`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					to: rec.email,
					subject,
					text,
					html,
				}),
			});

			if (res.ok) {
				// oznacz jako wysłane
				await supabase.from("campaign_reminders").update({ sent: true }).eq("id", rec.id);
			} else {
				console.error("Błąd Brevo:", await res.json());
			}
		} catch (e) {
			console.error("Fetch do /api/send-email nie powiódł się:", e);
		}
	}

	return NextResponse.json({ sent: toSend.length });
}
