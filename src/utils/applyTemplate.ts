import type { Country, UrlTemplate } from "@/types";

/** 치환 후에도 남아 있으면 throw 대상 — `{localeCode}` 외 임의 placeholder 포함 */
const UNRESOLVED_PLACEHOLDER = /\{[^{}]+\}/;

/**
 * 템플릿의 `{localeCode}`·`{countryCode}`를 Country 값으로 치환한다.
 * ARCHITECTURE §3.2: 인코딩·대소문자 변환 없이 데이터 문자열 그대로 사용.
 */
export function applyTemplate(
  template: UrlTemplate,
  country: Country
): string {
  const resolved = template
    .replaceAll("{localeCode}", country.localeCode)
    .replaceAll("{countryCode}", country.countryCode);

  if (UNRESOLVED_PLACEHOLDER.test(resolved)) {
    const leftover = resolved.match(UNRESOLVED_PLACEHOLDER)?.[0] ?? "{?}";
    throw new Error(
      `applyTemplate: 미치환 placeholder ${leftover} (country.id=${country.id})`
    );
  }

  return resolved;
}
