"use client";

import Link from "next/link";
import { LanguageSelector } from "@/components/language-selector";
import type { Locale } from "@/lib/i18n/config";
import type { Translations } from "@/lib/i18n";

// Inline SVG shield/lock icon for CalcSafe
function ShieldLockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-label="CalcSafe logo"
    >
      <path
        d="M16 2L4 7v8c0 7.5 5.1 14.5 12 16.5C23 29.5 28 22.5 28 15V7L16 2z"
        fill="#E53935"
        opacity="0.15"
        stroke="#E53935"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 3.5L5.5 8v7c0 6.9 4.7 13.3 10.5 15.1C21.8 28.3 26.5 21.9 26.5 15V8L16 3.5z"
        fill="#E53935"
        opacity="0.2"
      />
      <rect x="11" y="14" width="10" height="8" rx="1.5" fill="#E53935" />
      <path
        d="M13 14v-2a3 3 0 0 1 6 0v2"
        stroke="#E53935"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="18" r="1.2" fill="white" />
    </svg>
  );
}

interface NavbarProps {
  locale: Locale;
  t: Translations;
}

export function Navbar({ locale, t }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <ShieldLockIcon className="w-8 h-8" />
          <span className="font-bold text-lg tracking-tight text-foreground">CalcSafe</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() =>
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.nav.features}
          </button>
          <button
            onClick={() =>
              document.getElementById("security")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.nav.security}
          </button>
          <Link
            href={`/${locale}/blog`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.nav.blog}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector currentLocale={locale} />
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full h-9 px-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t.nav.download}
          </a>
        </div>
      </div>
    </nav>
  );
}

interface BlogNavProps {
  locale: Locale;
  t: Translations;
  activePage?: "home" | "blog";
}

export function BlogNav({ locale, t, activePage }: BlogNavProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <ShieldLockIcon className="w-8 h-8" />
          <span className="font-bold text-lg tracking-tight text-foreground">CalcSafe</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href={`/${locale}`}
            className={`text-sm font-medium transition-colors ${
              activePage === "home"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.nav.home}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className={`text-sm font-medium transition-colors ${
              activePage === "blog"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.nav.blog}
          </Link>
        </div>
        <LanguageSelector currentLocale={locale} />
      </div>
    </nav>
  );
}
