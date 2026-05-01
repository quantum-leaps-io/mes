import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en'
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Firebase App Hosting runs on an internal port (e.g. 8080).
  // next-intl picks up that port when building redirect URLs, producing
  // Location headers like "https://example.com:8080/en" which break
  // because the external load-balancer listens on 443.
  // Strip the port from any redirect Location header.
  const location = response.headers.get('location');
  if (location) {
    try {
      const url = new URL(location);
      if (url.port) {
        url.port = '';
        return NextResponse.redirect(url, response.status as 307 | 308);
      }
    } catch {
      // Not a valid URL, leave as-is
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
