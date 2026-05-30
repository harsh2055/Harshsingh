import { defineMiddleware } from 'astro:middleware';

const SUPPORTED_LOCALES = ['en'] as const;
const DEFAULT_LOCALE = 'en';
const LOCALE_COOKIE_NAME = 'preferred-locale';

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Detects the preferred locale from the Accept-Language header
 * Returns the best match from supported locales, or the default locale
 */
function detectLocaleFromHeader(acceptLanguage: string | null): SupportedLocale {
    if (!acceptLanguage) return DEFAULT_LOCALE;

    // Parse Accept-Language header (e.g., "es-ES,es;q=0.9,en;q=0.8")
    const languages = acceptLanguage
        .split(',')
        .map((lang) => {
            const [code, qValue] = lang.trim().split(';q=');
            return {
                // Get the primary language code (e.g., "es" from "es-ES")
                code: code.split('-')[0].toLowerCase(),
                // Default quality is 1.0 if not specified
                quality: qValue ? Number.parseFloat(qValue) : 1.0
            };
        })
        .sort((a, b) => b.quality - a.quality);

    // Find the first supported locale
    for (const { code } of languages) {
        if (SUPPORTED_LOCALES.includes(code as SupportedLocale)) {
            return code as SupportedLocale;
        }
    }

    return DEFAULT_LOCALE;
}

export const onRequest = defineMiddleware(async (context, next) => {
    const pathname = context.url.pathname;

    // We no longer redirect `/` here because we want to show the custom spinner
    // page built in src/pages/index.astro which handles the client-side redirect.
    // If you need server-side redirects in Vercel, you should use vercel.json.


    return next();
});
