import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { isValidLocale, rtlLocales, locales } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";

const BASE_URL = "https://vaultyapp.com";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!isValidLocale(locale)) {
    return {
      title: {
        default: "CalcSafe: Hidden Photo Vault — Hide Photos, Videos & Files",
        template: "%s | Photo Vault",
      },
    };
  }

  // Read the current pathname from the x-pathname header set by middleware
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || `/${locale}`;

  // Strip the locale prefix to get the path suffix (e.g. "/blog/some-slug")
  const pathSuffix = pathname.replace(new RegExp(`^/${locale}`), "") || "";

  // Build hreflang alternates for all 15 locales
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${BASE_URL}/${loc}${pathSuffix}`;
  }
  // x-default points to English
  languages["x-default"] = `${BASE_URL}/en${pathSuffix}`;

  return {
    title: {
      default: "CalcSafe: Hidden Photo Vault — Hide Photos, Videos & Files",
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
    // Google Search Console verification placeholder
    verification: {
      google: "GOOGLE_VERIFICATION_PLACEHOLDER",
    },
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}${pathname}`,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: "Photo Vault",
      title: "CalcSafe: Hidden Photo Vault — Hide Photos, Videos & Files",
      description:
        "Hide private photos, videos, and files behind a working calculator. No one will ever know.",
      images: ["/images/screenshot-calculator.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: "CalcSafe: Hidden Photo Vault — Hide Photos, Videos & Files",
      description:
        "Hide private photos, videos, and files behind a working calculator.",
      images: ["/images/screenshot-calculator.jpg"],
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const isRtl = rtlLocales.includes(locale as Locale);

  return (
    <div dir={isRtl ? "rtl" : "ltr"} lang={locale}>
      {children}
    </div>
  );
}
