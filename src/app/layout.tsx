import { Navigation } from "@/components/Navigation/Navigation";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.scss";
import { RootProvider } from "./providers/root-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swollen Katz",
  description: "Wyjątkowe dropy na koty",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" type="image/png" href="/manifest/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/manifest/favicon.svg" />
        <link rel="shortcut icon" href="/manifest/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/manifest/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest/site.webmanifest" />
      </head>
      <body
        cz-shortcut-listen="true"
        className={`${poppins.variable} antialiased`}
      >
        <RootProvider>
          <Navigation />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
