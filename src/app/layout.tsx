import { Navigation } from "@/components/Navigation/Navigation";
import { ScrollToTop } from "@/components/ScrollToTop/ScrollToTop";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.scss";
import { RootProvider } from "./providers/root-provider";

const brushed = localFont({
  src: './fonts/edosz.ttf',
  display: 'swap',
  fallback: ['system-ui'],
  variable: '--font-edosz',
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swollen Katz",
  description: "Wyjątkowe dropy na koty",
  openGraph: {
    title: "Swollen Katz",
    description: "Wyjątkowe dropy na koty",
    url: "https://swollenkatz.com",
    siteName: "Swollen Katz",
    images: [
      {
        url: "https://swollenkatz.com/images/og-image.png",
        width: 1200,
        height: 608,
        alt: "Swollen Katz - Wyjątkowe dropy na koty",
        type: "image/png",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swollen Katz",
    description: "Wyjątkowe dropy na koty",
    images: ["https://swollenkatz.com/images/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${brushed.variable}`}
    >
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" type="image/png" href="/manifest/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/manifest/favicon.svg" />
        <link rel="shortcut icon" href="/manifest/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/manifest/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest/site.webmanifest" />
        <link href="https://db.onlinewebfonts.com/c/da9cff182f31b3af02363c770502bf49?family=Brushstrike" rel="stylesheet" />

        {/* Additional meta tags for better social media sharing */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="608" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="608" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (history.scrollRestoration) {
                history.scrollRestoration = 'manual';
              }
            `,
          }}
        />
      </head>
      <body
        cz-shortcut-listen="true"
        className={`antialiased`}
      >
        <RootProvider>
          <ScrollToTop />
          <Navigation />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
