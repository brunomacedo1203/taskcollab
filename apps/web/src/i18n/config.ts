export const supportedLocales = ['pt', 'en'] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = 'pt';

export const isSupportedLocale = (value: string): value is Locale =>
  supportedLocales.includes(value as Locale);
