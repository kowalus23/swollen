import { createServerSupabaseClient } from "@/lib/supabase";
import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const REMINDER_DAYS = [7, 1];

// Function to get campaign title from campaigns.json
function getCampaignTitle(campaignName) {
	try {
		const campaignsPath = join(process.cwd(), "public", "campaigns.json");
		const campaignsData = JSON.parse(readFileSync(campaignsPath, "utf8"));

		if (campaignsData[campaignName] && campaignsData[campaignName].title) {
			return `"${campaignsData[campaignName].title}"`;
		}

		// Fallback to original campaign name if not found
		return `"${campaignName}"`;
	} catch (error) {
		console.error("Error reading campaigns.json:", error);
		// Fallback to original campaign name if file read fails
		return `"${campaignName}"`;
	}
}

export async function POST(req) {
	const { email, campaignName, campaignStartAt } = await req.json();

	if (!email || !campaignName || !campaignStartAt) {
		return NextResponse.json({ error: "Brak wymaganych pól" }, { status: 400 });
	}

	const supabase = createServerSupabaseClient();

	// Get the formatted campaign title
	const campaignTitle = getCampaignTitle(campaignName);

	// 1. Check for duplicates
	const { data: existing, error: checkError } = await supabase
		.from("campaign_reminders")
		.select("id")
		.eq("email", email)
		.eq("campaign_name", campaignName)
		.limit(1);

	if (checkError) {
		console.error("Error checking for duplicates:", checkError);
		return NextResponse.json({ error: "Database error" }, { status: 500 });
	}

	if (existing && existing.length > 0) {
		return NextResponse.json({ error: "Jesteś już na liście powiadomień dla tej kolekcji." }, { status: 409 });
	}

	// 2. Add new reminders
	const reminderRecords = REMINDER_DAYS.map((days) => ({
		email,
		campaign_name: campaignName,
		campaign_start_at: campaignStartAt,
		days_before: days,
		sent: false,
	}));

	const { error: insertError } = await supabase.from("campaign_reminders").insert(reminderRecords);

	if (insertError) {
		console.error("Error inserting new reminders:", insertError);
		return NextResponse.json({ error: "Nie udało się dodać Ci do listy powiadomień." }, { status: 500 });
	}

	// 3. Send confirmation email
	const subject = `🚀 Gotowy na ${campaignTitle}? Jesteś już na pokładzie!`;
	const text = `Cześć! 🎉 Trafiłeś prosto na listę VIP na premierę ${campaignTitle}.  
Startujemy ${new Date(campaignStartAt).toLocaleDateString()} – wyślemy Ci przypomnienie, żebyś niczego nie przegapił!  
Sprawdź naszą apkę: ${APP_URL}`;
const html = `
  <p>Cześć! 🎉</p>
  <p>Jesteś teraz na liście VIP na premierę <strong>${campaignTitle}</strong>.</p>
  <p>Startujemy <strong>${new Date(campaignStartAt).toLocaleDateString()}</strong> – przypomnimy Ci o tym dniu!</p>
  <p>👉 <a href="${APP_URL}" target="_blank">Zajrzyj do naszej apki</a> i bądź na bieżąco.</p>
`;

	try {
		const emailResponse = await fetch(`${APP_URL}/api/send-email`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ to: email, subject, text, html }),
		});

		if (!emailResponse.ok) {
			console.error("Brevo error:", await emailResponse.json());
			// Don't block the process if email fails, as the user is already subscribed
		}
	} catch (e) {
		console.error("Failed to fetch /api/send-email:", e);
	}

	return NextResponse.json({ message: "Pomyślnie zapisano Cię do powiadomień o nadochodzącej premierze!" }, { status: 201 });
}
