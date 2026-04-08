import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { isValidLocale } from "@/lib/i18n/config";
import { getTranslationsSync } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

// SVG Icons
function Apple({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
      <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
    </svg>
  );
}

function PlayStore({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3.18 1.52L13.58 12 3.18 22.48a1.04 1.04 0 0 1-.18-.6V2.12c0-.22.06-.42.18-.6z" fill="#4285F4"/>
      <path d="M17.34 8.15L13.58 12l3.76 3.85 4.28-2.43c.78-.44.78-1.4 0-1.84l-4.28-2.43z" fill="#FBBC04"/>
      <path d="M3.18 22.48c.2.3.5.5.86.52l13.3-7.15L13.58 12 3.18 22.48z" fill="#EA4335"/>
      <path d="M3.18 1.52L13.58 12l3.76-3.85L4.04 1c-.36.02-.66.22-.86.52z" fill="#34A853"/>
    </svg>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function Lock({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  );
}

function Bell({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  );
}

function EyeOff({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
  );
}

function DollarSign({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
}

function Layers({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22.4 10.08-8.58 3.91a2 2 0 0 1-1.66 0l-8.58-3.9"/><path d="m22.4 14.08-8.58 3.91a2 2 0 0 1-1.66 0l-8.58-3.9"/>
    </svg>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

function Calculator({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>
    </svg>
  );
}

function Image2({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  );
}

function FolderLock({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v2.5"/><rect width="8" height="5" x="14" y="17" rx="1"/><path d="M14 17v-2a2 2 0 0 1 4 0v2"/>
    </svg>
  );
}

function Palette({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  );
}

export default function LandingPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isValidLocale(locale)) notFound();

  const t = getTranslationsSync(locale as Locale);

  const featureIcons = [Calculator, Image2, FolderLock, Palette];
  const featureImages = [
    "/images/screenshot-calculator.jpg",
    "/images/screenshot-photos.jpg",
    "/images/screenshot-dashboard.jpg",
    "/images/screenshot-customize.jpg",
  ];

  const featuresData = [
    { icon: featureIcons[0], title: t.features.calculator.title, description: t.features.calculator.desc, image: featureImages[0] },
    { icon: featureIcons[1], title: t.features.photos.title, description: t.features.photos.desc, image: featureImages[1] },
    { icon: featureIcons[2], title: t.features.dashboard.title, description: t.features.dashboard.desc, image: featureImages[2] },
    { icon: featureIcons[3], title: t.features.customize.title, description: t.features.customize.desc, image: featureImages[3] },
  ];

  const securityIcons = [ShieldCheck, Cloud, Layers, Heart];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar locale={locale as Locale} t={t} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
        {/* Dark red gradient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#E53935]/10 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#E53935]/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#E53935]/10 border border-[#E53935]/20 text-[#E53935] rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.hero.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-5 text-white">
                {t.hero.title1}{" "}
                <span className="text-[#E53935]">{t.hero.title2}</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#999] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-6 text-base font-semibold bg-white text-[#0F0F0F] hover:bg-white/90 transition-colors"
                >
                  <Apple className="w-5 h-5" />
                  {t.hero.appStore}
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-6 text-base font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <PlayStore className="w-5 h-5" />
                  {t.hero.googlePlay}
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 bg-[#E53935]/15 rounded-[3rem] blur-3xl" />
                <Image
                  src="/images/screenshot-calculator.jpg"
                  alt="Vaulty calculator disguise"
                  width={280}
                  height={560}
                  className="relative w-[260px] sm:w-[280px] rounded-[2rem] shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
              {t.features.sectionTitle}
            </h2>
            <p className="text-[#999] text-lg max-w-2xl mx-auto">
              {t.features.sectionSubtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {featuresData.map((feature, i) => (
              <Card
                key={i}
                className="group overflow-hidden bg-[#1C1C1E] border-white/5 hover:border-[#E53935]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#E53935]/5"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row items-start gap-0">
                    <div className="p-6 sm:p-8 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-[#E53935]/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-5 h-5 text-[#E53935]" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                      <p className="text-[#999] text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div className="w-full sm:w-40 flex-shrink-0 flex justify-center sm:justify-end p-4 sm:p-6">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={128}
                        height={256}
                        className="w-28 sm:w-32 rounded-2xl shadow-md group-hover:shadow-lg transition-shadow border border-white/5"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security / Why Vaulty Section */}
      <section id="security" className="py-20 sm:py-28 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
              {t.security.sectionTitle}
            </h2>
            <p className="text-[#999] text-lg max-w-2xl mx-auto">
              {t.security.sectionSubtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.security.items.map((item, i) => {
              const Icon = securityIcons[i] || ShieldCheck;
              return (
                <div
                  key={i}
                  className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 hover:border-[#E53935]/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E53935]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#E53935]" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[#999] text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
              {t.testimonials.sectionTitle}
            </h2>
            <p className="text-[#999] text-lg max-w-2xl mx-auto">
              {t.testimonials.sectionSubtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {t.testimonials.items.map((testimonial, i) => (
              <Card key={i} className="bg-[#1C1C1E] border-white/5">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-[#999] mb-5">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-sm text-white">{testimonial.name}</p>
                    <p className="text-xs text-[#666]">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E53935]/20 to-[#B71C1C]/10" />
        <div className="absolute inset-0 bg-[#0A0A0A]/60" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
            {t.cta.title}
          </h2>
          <p className="text-[#aaa] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-6 text-base font-semibold bg-white text-[#0F0F0F] hover:bg-white/90 transition-colors"
            >
              <Apple className="w-5 h-5" />
              {t.cta.appStore}
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-6 text-base font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-colors"
            >
              <PlayStore className="w-5 h-5" />
              {t.cta.googlePlay}
            </a>
          </div>
        </div>
      </section>

      <Footer locale={locale as Locale} t={t} />
    </div>
  );
}
