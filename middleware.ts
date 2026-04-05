import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n/config";

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header
  const preferred = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q = "q=1"] = lang.trim().split(";");
      const quality = parseFloat(q.split("=")[1]) || 1;
      return { code: code.trim().toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of preferred) {
    // Try exact match first (e.g., "zh-CN" → "zh")
    const primary = code.split("-")[0];
    if (isValidLocale(primary)) return primary;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-page routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Check if the path already has a valid locale prefix
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    // Valid locale already in path — pass through with x-pathname header
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  }

  // Redirect to locale-prefixed path
  const locale = getPreferredLocale(request);
  const newPath = `/${locale}${pathname === "/" ? "" : pathname}`;
  const url = request.nextUrl.clone();
  url.pathname = newPath;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
