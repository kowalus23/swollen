// pages/api/send-email.js
import SibApiV3Sdk from 'sib-api-v3-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, text, html } = req.body;
  if (!to || !subject || (!text && !html)) {
    return res
      .status(400)
      .json({ error: 'Brak wymaganych pól: to, subject, text/html' });
  }

  // Konfiguracja klienta
  const client = SibApiV3Sdk.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    sender: {
      email: process.env.NEXT_PUBLIC_MAIL_FROM_EMAIL,
      name: process.env.NEXT_PUBLIC_MAIL_FROM_NAME || 'Your App',
    },
    to: [{ email: to }],
    subject,
    textContent: text,
    htmlContent: html,
  };

  try {
    const { body } = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return res.status(200).json(body);
  } catch (err) {
    console.error('Brevo error:', err);
    return res
      .status(err.status || 500)
      .json({ error: err.message || 'Unexpected error' });
  }
}
