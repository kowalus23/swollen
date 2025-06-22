// pages/api/brevo-webhook.js
export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}

	// Brevo wysyła payload w req.body.data
	const events = Array.isArray(req.body) ? req.body : req.body.data;

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
	res.status(200).json({ status: "ok" });
}
