import { NextResponse } from "next/server";

export async function POST(request) {
	// Brevo wysyła payload w request.body.data
	const body = await request.json();
	const events = Array.isArray(body) ? body : body.data;

	for (const ev of events) {
		const { email, messageId, event, ts, url } = ev;
		switch (event) {
			case "delivered":
				console.log(`Dostarczono do ${email}, msgId=${messageId}`);
				break;
			case "softBounce":
			case "hardBounce":
				console.log(`Bounce (${event}) dla ${email}, msgId=${messageId}`);
				// tu można oznaczyć w bazie jako niedostarczalny
				break;
			case "open":
				console.log(`Otworzono przez ${email}, msgId=${messageId}`);
				break;
			case "click":
				console.log(`Kliknięto link ${url} przez ${email}`);
				break;
			default:
				console.log(`Inne zdarzenie: ${event}`, ev);
		}
	}

	// Brevo oczekuje 2xx
	return NextResponse.json({ status: "ok" });
}
