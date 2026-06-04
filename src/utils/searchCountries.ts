import type { Country } from "@/types";

/**
 * 검색어·비교 대상을 소문자로 통일 (대소문자 무시 부분 문자열 매칭)
 */
function toSearchKey(value: string): string {
  return value.toLocaleLowerCase();
}

/**
 * name 또는 nameAliases 중 하나라도 query 부분 문자열을 포함하면 true
 */
function matchesQuery(country: Country, trimmedQuery: string): boolean {
  const needle = toSearchKey(trimmedQuery);

  if (toSearchKey(country.name).includes(needle)) {
    return true;
  }

  if (country.nameAliases) {
    for (const alias of country.nameAliases) {
      if (toSearchKey(alias).includes(needle)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * 국가 목록을 name·nameAliases 기준으로 필터한다 (ARCHITECTURE §3.6).
 * 검색어는 호출 시 trim — trim 후 빈 문자열이면 입력 배열 전체를 그대로 반환.
 */
export function searchCountries(
  countries: Country[],
  query: string
): Country[] {
  const trimmed = query.trim();

  if (trimmed === "") {
    return countries;
  }

  return countries.filter((country) => matchesQuery(country, trimmed));
}
