import type { Country, CountryLocale } from "@/types";

/** Site/NCMS URL 생성에 쓸 로케일 목록 — `locales` 없으면 `localeCode` 1건 */
export function getCountryLocales(country: Country): CountryLocale[] {
  if (country.locales && country.locales.length > 0) {
    return country.locales;
  }
  return [{ localeCode: country.localeCode }];
}

/** 목록·패널 메타에 표시할 localeCode 문자열 */
export function formatLocaleCodesDisplay(country: Country): string {
  return getCountryLocales(country)
    .map((loc) => loc.localeCode)
    .join(", ");
}

/** 치환용 Country — 해당 로케일의 localeCode만 덮어씀 */
export function countryForLocale(
  country: Country,
  localeCode: string
): Country {
  return { ...country, localeCode };
}
