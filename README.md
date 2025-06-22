# Swollen Front - Next.js Application

## Konfiguracja JSON - Przewodnik

Aplikacja używa plików JSON do konfiguracji różnych sekcji. Oto szczegółowy opis każdego pliku:

### 📅 `public/campaigns.json` - Kampanie sprzedażowe

```json
{
	"september_drop_2025": {
		"title": "Wrześniowa kolekcja", // Tytuł kampanii wyświetlany użytkownikom
		"description": "LOREM IPSUM...", // Opis kampanii
		"startFrom": "2025-09-16", // Data rozpoczęcia kampanii (YYYY-MM-DD)
		"endAt": "2025-09-30", // Data zakończenia kampanii (YYYY-MM-DD)
		"items": [
			// Lista produktów w kampanii
			{
				"id": "1", // Unikalny identyfikator produktu
				"name": "Item 1", // Nazwa produktu
				"price": 100, // Cena produktu
				"image": "https://..." // URL obrazka produktu
			}
		]
	}
}
```

**Wpływ na interfejs:** Kampanie są wyświetlane w sekcji sklepu i mogą mieć specjalne oznaczenia czasowe.

### 🗺️ `public/event.json` - Konfiguracja wydarzenia

```json
{
	"title": "Wydarzenie", // Tytuł wydarzenia
	"description": "Opis wydarzenia", // Opis wydarzenia
	"pin": {
		"longitude": 52.2297, // Długość geograficzna (Warszawa)
		"latitude": 21.0122, // Szerokość geograficzna (Warszawa)
		"startZoom": 14 // Poziom przybliżenia mapy (1-20)
	},
	"radiusInKm": 0.5 // Promień w kilometrach dla lokalizacji
}
```

**Wpływ na interfejs:** Konfiguruje mapę w sekcji wydarzeń - pokazuje pin lokalizacji i ustawia odpowiednie przybliżenie.

### 🆕 `public/new-collection.json` - Nowa kolekcja

```json
{
	"hideSection": false, // true/false - ukrywa/pokazuje sekcję
	"description": "LOREM IPSUM...", // Główny opis kolekcji
	"additionalDescription": "JUŻ OD WRZEŚNIA", // Dodatkowy opis (np. data)
	"campaignStartAt": "2025-09-16", // Data rozpoczęcia kampanii
	"campaingName": "september_drop_2025", // Nazwa kampanii (link do campaigns.json)
	"previewImages": [
		// Lista obrazków podglądu
		"https://i.imgur.com/DG47GhS.png",
		"https://i.imgur.com/8Wi9ZS5.png"
	]
}
```

**Wpływ na interfejs:** Kontroluje sekcję "Nowa kolekcja" na stronie głównej - może być ukryta/pokazana, wyświetla obrazy podglądu i opis.

### 📰 `public/news.json` - Aktualności

```json
{
	"news": {
		"title": "AKTUALIZACJA", // Tytuł aktualności
		"description": "Nowa kolekcja...", // Treść aktualności
		"isVisible": true, // true/false - pokazuje/ukrywa aktualność
		"isVisibleFromDate": true, // true/false - czy używać dat widoczności
		"visibilityFromDate": "2025-06-15", // Data od której pokazywać (YYYY-MM-DD)
		"visibilityToDate": "2025-08-20" // Data do której pokazywać (YYYY-MM-DD)
	}
}
```

**Wpływ na interfejs:** Kontroluje wyświetlanie banera aktualności na stronie głównej z automatycznym ukrywaniem po określonej dacie.

### 🛍️ `public/shop.json` - Produkty w sklepie

```json
{
	"products": [
		{
			"id": 1, // Unikalny identyfikator produktu
			"internalName": "produkt-1", // Wewnętrzna nazwa (slug)
			"name": "Produkt 1", // Nazwa wyświetlana użytkownikom
			"description": "Lorem ipsum...", // Opis produktu
			"price": 100, // Cena produktu
			"sizes": ["S", "M", "L", "XL", "XXL"], // Dostępne rozmiary
			"image": "https://..." // URL obrazka produktu
		}
	]
}
```

**Wpływ na interfejs:** Definiuje wszystkie produkty wyświetlane w sekcji sklepu z ich szczegółami, cenami i dostępnymi rozmiarami.

### 📱 `public/socials.json` - Media społecznościowe

```json
{
	"instagramUrl": "https://www.instagram.com/...", // Link do Instagrama
	"tiktokUrl": "https://www.tiktok.com/...", // Link do TikToka
	"facebookUrl": "https://www.facebook.com/..." // Link do Facebooka
}
```

**Wpływ na interfejs:** Konfiguruje linki do mediów społecznościowych wyświetlane w sekcji social media na stronie głównej.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables

This project requires the following environment variables to be set:

### For Local Development

Create a `.env.local` file in the root directory with:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Configuration (Brevo)
NEXT_PUBLIC_BREVO_API_KEY=your_brevo_api_key
NEXT_PUBLIC_MAIL_FROM_EMAIL=your_from_email@example.com
NEXT_PUBLIC_MAIL_FROM_NAME=Your App Name
```

### For Vercel Deployment

Add these same environment variables in your Vercel project settings:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all the variables listed above

**Important**: Make sure to set `NEXT_PUBLIC_APP_URL` to your production URL (e.g., `https://your-app.vercel.app`) for Vercel deployment.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
