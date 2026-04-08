"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Translations } from "@/lib/i18n";

// Inline shield/lock icon for footer
function ShieldLockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      aria-label="Photo Vault"
    >
      <path
        d="M16 2L4 7v8c0 7.5 5.1 14.5 12 16.5C23 29.5 28 22.5 28 15V7L16 2z"
        fill="#E53935"
        opacity="0.15"
        stroke="#E53935"
        strokeWidth="1.5"
        strokeLinejoin="round"
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

interface FooterProps {
  locale: Locale;
  t: Translations;
}

export function Footer({ locale, t }: FooterProps) {
  return (
    <footer className="py-12 bg-[#0A0A0A] border-t border-border/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <ShieldLockIcon className="w-6 h-6" />
              <span className="font-bold text-base text-foreground">Vaulty</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">{t.footer.product}</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.features}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("security")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.security}
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.download}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">{t.footer.resources}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${locale}/blog`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.blog}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.helpCenter}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">{t.footer.legal}</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.cookies}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {t.footer.copyright}
          </p>
          <a
            href="https://www.perplexity.ai/computer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.footer.madeWith}
          </a>
        </div>
      </div>
    </footer>
  );
}

interface BlogFooterProps {
  t: Translations;
}

export function BlogFooter({ t }: BlogFooterProps) {
  return (
    <footer className="py-10 bg-[#0A0A0A] border-t border-border/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldLockIcon className="w-5 h-5" />
          <span className="text-sm font-medium text-foreground">Vaulty</span>
        </div>
        <a
          href="https://www.perplexity.ai/computer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {t.footer.madeWith}
        </a>
        <p className="text-xs text-muted-foreground">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
