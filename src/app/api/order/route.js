// app/api/order/route.js
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY);

// Function to send order notification email
async function sendOrderNotificationEmail(orderData) {
	const { productName, productSize, addressCity, addressPostalCode, addressStreet, contactEmail, contactPhone } = orderData;

	const subject = "Zamówienie na produkt";
	const text = `
Nowe zamówienie produktu!

Produkt: ${productName}
Rozmiar: ${productSize}

Dane kontaktowe:
Email: ${contactEmail}
Telefon: ${contactPhone}

Adres dostawy:
${addressStreet}
${addressPostalCode} ${addressCity}

Data zamówienia: ${new Date().toLocaleString("pl-PL")}
	`.trim();

	const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #333; text-align: center; margin-bottom: 30px; font-size: 24px;">🛍️ Nowe zamówienie produktu!</h1>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #495057; margin-top: 0; font-size: 18px;">📦 Szczegóły produktu</h2>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Produkt:</strong> ${productName}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Rozmiar:</strong> ${productSize}</p>
        </div>

        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1976d2; margin-top: 0; font-size: 18px;">📞 Dane kontaktowe</h2>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${contactEmail}" style="color: #1976d2;">${contactEmail}</a></p>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Telefon:</strong> <a href="tel:${contactPhone}" style="color: #1976d2;">${contactPhone}</a></p>
        </div>

        <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #7b1fa2; margin-top: 0; font-size: 18px;">📍 Adres dostawy</h2>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Ulica:</strong> ${addressStreet}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Kod pocztowy:</strong> ${addressPostalCode}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Miasto:</strong> ${addressCity}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e9ecef;">
          <p style="color: #6c757d; font-size: 14px; margin: 0;">
            <strong>Data zamówienia:</strong> ${new Date().toLocaleString("pl-PL")}
          </p>
        </div>
      </div>
    </div>
  `.trim();

	try {
		// Direct Brevo API call instead of self-referencing fetch
		const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
		if (!BREVO_API_KEY) {
			console.error("Klucz API Brevo nie jest skonfigurowany");
			return;
		}

		const url = "https://api.brevo.com/v3/smtp/email";
		const data = {
			sender: {
				email: process.env.NEXT_PUBLIC_MAIL_FROM_EMAIL,
				name: process.env.NEXT_PUBLIC_MAIL_FROM_NAME || "KVX",
			},
			to: [{ email: process.env.NEXT_PUBLIC_MAIL_FROM_EMAIL }],
			subject,
			htmlContent: html,
			textContent: text,
		};

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"api-key": BREVO_API_KEY,
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			console.error("Nie udało się wysłać emaila z powiadomieniem o zamówieniu:", await response.json());
		} else {
			console.log("Email z powiadomieniem o zamówieniu został wysłany pomyślnie");
		}
	} catch (error) {
		console.error("Błąd podczas wysyłania emaila z powiadomieniem o zamówieniu:", error);
	}
}

// Function to send order confirmation email to customer
async function sendOrderConfirmationEmail(orderData) {
	const { productName, productSize, addressCity, addressPostalCode, addressStreet, contactEmail, contactPhone } = orderData;

	const subject = "Potwierdzenie zamówienia - Swollen Katz";
	const text = `
Dziękujemy za złożenie zamówienia w Swollen Katz!

Szczegóły zamówienia:
Produkt: ${productName}
Rozmiar: ${productSize}

Adres dostawy:
${addressStreet}
${addressPostalCode} ${addressCity}

Niedługo się do Ciebie odezwiemy z informacjami na temat procesowania zamówienia.

Data zamówienia: ${new Date().toLocaleString("pl-PL")}
	`.trim();

	const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #333; text-align: center; margin-bottom: 30px; font-size: 24px;">✅ Potwierdzenie zamówienia</h1>
        
        <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #28a745;">
          <h2 style="color: #155724; margin-top: 0; font-size: 18px;">🎉 Dziękujemy za złożenie zamówienia w Swollen Katz!</h2>
          <p style="margin: 10px 0; font-size: 16px; color: #155724;">Niedługo się do Ciebie odezwiemy z informacjami na temat procesowania zamówienia.</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #495057; margin-top: 0; font-size: 18px;">📦 Szczegóły zamówienia</h2>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Produkt:</strong> ${productName}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Rozmiar:</strong> ${productSize}</p>
        </div>

        <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #7b1fa2; margin-top: 0; font-size: 18px;">📍 Adres dostawy</h2>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Ulica:</strong> ${addressStreet}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Kod pocztowy:</strong> ${addressPostalCode}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Miasto:</strong> ${addressCity}</p>
        </div>

        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
          <h2 style="color: #856404; margin-top: 0; font-size: 18px;">📞 Co dalej?</h2>
          <p style="margin: 10px 0; font-size: 16px; color: #856404;">Niedługo się do Ciebie odezwiemy z informacjami na temat procesowania zamówienia.</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e9ecef;">
          <p style="color: #6c757d; font-size: 14px; margin: 0;">
            <strong>Data zamówienia:</strong> ${new Date().toLocaleString("pl-PL")}
          </p>
        </div>
      </div>
    </div>
  `.trim();

	try {
		// Direct Brevo API call instead of self-referencing fetch
		const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
		if (!BREVO_API_KEY) {
			console.error("Klucz API Brevo nie jest skonfigurowany");
			return;
		}

		const url = "https://api.brevo.com/v3/smtp/email";
		const data = {
			sender: {
				email: process.env.NEXT_PUBLIC_MAIL_FROM_EMAIL,
				name: process.env.NEXT_PUBLIC_MAIL_FROM_NAME || "Swollen Katz",
			},
			to: [{ email: contactEmail }],
			subject,
			htmlContent: html,
			textContent: text,
		};

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"api-key": BREVO_API_KEY,
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			console.error("Nie udało się wysłać emaila z potwierdzeniem zamówienia:", await response.json());
		} else {
			console.log("Email z potwierdzeniem zamówienia został wysłany pomyślnie");
		}
	} catch (error) {
		console.error("Błąd podczas wysyłania emaila z potwierdzeniem zamówienia:", error);
	}
}

export async function POST(request) {
	try {
		const { productName, productSize, addressCity, addressPostalCode, addressStreet, contactEmail, contactPhone } = await request.json();

		// 1. Basic validation
		if (!productName || !productSize || !addressCity || !addressPostalCode || !addressStreet || !contactEmail || !contactPhone) {
			return NextResponse.json({ error: "Wszystkie pola są wymagane." }, { status: 400 });
		}

		if (productName.length > 150) {
			return NextResponse.json({ error: "Nazwa produktu może mieć maksymalnie 150 znaków." }, { status: 400 });
		}

		if (productSize.length > 10) {
			return NextResponse.json({ error: "Rozmiar produktu może mieć maksymalnie 10 znaków." }, { status: 400 });
		}

		// simple email regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(contactEmail)) {
			return NextResponse.json({ error: "Nieprawidłowy format adresu email." }, { status: 400 });
		}

		// 2. Insert into Supabase
		const { data, error } = await supabase
			.from("product_orders")
			.insert([
				{
					product_name: productName,
					product_size: productSize,
					address_city: addressCity,
					address_postal_code: addressPostalCode,
					address_street: addressStreet,
					contact_email: contactEmail,
					contact_phone: contactPhone,
				},
			])
			.select(); // Add .select() to return the inserted data

		if (error) {
			// Supabase returns Postgres error codes in `error.code`
			// 23505 = unique_violation
			if (error.code === "23505") {
				return NextResponse.json({ error: "Zamówiłeś już ten produkt." }, { status: 409 });
			}
			// other errors
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		// 3. Send notification email
		await sendOrderNotificationEmail({
			productName,
			productSize,
			addressCity,
			addressPostalCode,
			addressStreet,
			contactEmail,
			contactPhone,
		});

		// 4. Send confirmation email to customer
		await sendOrderConfirmationEmail({
			productName,
			productSize,
			addressCity,
			addressPostalCode,
			addressStreet,
			contactEmail,
			contactPhone,
		});

		// 5. Return the created order data
		return NextResponse.json({ order: data[0] }, { status: 201 });
	} catch (err) {
		console.error("Błąd API zamówienia:", err);
		return NextResponse.json({ error: "Wystąpił błąd wewnętrzny serwera." }, { status: 500 });
	}
}
