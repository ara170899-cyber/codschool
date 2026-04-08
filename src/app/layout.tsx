import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: {
    default: "CodeSchool — Школа программирования Python",
    template: "%s | CodeSchool",
  },
  description:
    "Научись программировать на Python с нуля. 10 интерактивных уроков с автопроверкой кода и ИИ-ассистентом. Бесплатно, в браузере.",
  keywords: [
    "программирование",
    "Python",
    "обучение",
    "курсы",
    "школа программирования",
    "ИИ",
    "код",
  ],
  authors: [{ name: "CodeSchool" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "CodeSchool — Научись программировать на Python",
    description:
      "10 интерактивных уроков с автопроверкой кода и ИИ-ассистентом. Бесплатно.",
    siteName: "CodeSchool",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeSchool — Научись программировать на Python",
    description:
      "10 интерактивных уроков с автопроверкой кода и ИИ-ассистентом.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
