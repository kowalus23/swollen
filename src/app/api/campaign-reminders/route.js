import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const REMINDER_DAYS = [7, 3, 1];

export async function POST(req) {
	const { email, campaignName, campaignStartAt } = await req.json();

	if (!email || !campaignName || !campaignStartAt) {
		return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
	}

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
		return NextResponse.json({ error: "You are already on the notification list for this campaign." }, { status: 409 });
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
		return NextResponse.json({ error: "Could not add you to the notification list." }, { status: 500 });
	}

	// 3. Send confirmation email
	const subject = `You're on the list for ${campaignName}!`;
	const text = `Hi! We'll notify you about the launch of "${campaignName}" on ${new Date(campaignStartAt).toLocaleDateString()}. Check out our app: ${APP_URL}`;
	const html = `<p>Hi!</p><p>We'll notify you about the launch of <strong>${campaignName}</strong> on <strong>${new Date(
		campaignStartAt
	).toLocaleDateString()}</strong>.</p><p><a href="${APP_URL}" target="_blank" rel="noopener">Visit our app</a></p>`;

	try {
		const emailResponse = await fetch(`/api/send-email`, {
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

	return NextResponse.json({ message: "Successfully subscribed for reminders!" }, { status: 201 });
}
