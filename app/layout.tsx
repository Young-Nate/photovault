import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vaulty: Hidden Photo Vault — Hide Photos, Videos & Files",
    template: "%s | Photo Vault",
  },
  description:
    "The #1 secret photo vault disguised as a calculator. Hide private photos, videos, documents, and passwords behind a working calculator. Free for iOS & Android.",
  keywords: [
    "photo vault",
    "calculator safe",
    "hide photos",
    "private photos",
    "secret vault",
    "privacy app",
    "photo locker",
  ],
  metadataBase: new URL("https://photovaultapp.com"),
  openGraph: {
    type: "website",
    siteName: "Photo Vault",
    title: "Vaulty: Hidden Photo Vault — Hide Photos, Videos & Files",
    description:
      "Hide private photos, videos, and files behind a working calculator. No one will ever know.",
    images: ["/images/screenshot-calculator.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaulty: Hidden Photo Vault — Hide Photos, Videos & Files",
    description:
      "Hide private photos, videos, and files behind a working calculator.",
    images: ["/images/screenshot-calculator.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
