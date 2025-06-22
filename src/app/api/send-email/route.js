// pages/api/send-email.js

export async function POST(req) {
	const body = await req.json();
	const { to, subject, text, html } = body;

	if (!to || !subject || (!text && !html)) {
		return new Response(JSON.stringify({ error: "Missing required fields: to, subject, text/html" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;

	if (!BREVO_API_KEY) {
		console.error("Brevo API Key not configured");
		return new Response(JSON.stringify({ error: "Server configuration error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}

	const url = "https://api.brevo.com/v3/smtp/email";

	const data = {
		sender: {
			email: process.env.NEXT_PUBLIC_MAIL_FROM_EMAIL,
			name: process.env.NEXT_PUBLIC_MAIL_FROM_NAME || "KVX",
		},
		to: [{ email: to }],
		subject,
		htmlContent: html,
		textContent: text,
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"api-key": BREVO_API_KEY,
		},
		body: JSON.stringify(data),
	};

	try {
		const response = await fetch(url, options);
		const responseData = await response.json();

		if (!response.ok) {
			console.error("Brevo API Error:", response.status, responseData);
			return new Response(JSON.stringify({ error: responseData.message || "An error occurred during email sending." }), {
				status: response.status,
				headers: { "Content-Type": "application/json" },
			});
		}

		return new Response(JSON.stringify({ message: "Successfully sent email!", data: responseData }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error sending email via Brevo:", error);
		return new Response(JSON.stringify({ error: "An unexpected error occurred." }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
