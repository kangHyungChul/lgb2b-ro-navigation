import type { Country, CountryGroup } from "@/types";

/** 그룹 메타 + 해당 그룹에 속한 국가(입력 순서 유지) */
export type GroupedCountries = {
  group: CountryGroup;
  countries: Country[];
};

/**
 * countryGroups 순서대로 섹션을 만들고, countries 중 groupId가 일치하는 항목만 담는다.
 * 검색 필터 후 빈 그룹은 제외한다.
 */
export function groupCountries(
  groups: CountryGroup[],
  countries: Country[]
): GroupedCountries[] {
  return groups
    .map((group) => ({
      group,
      countries: countries.filter((c) => c.groupId === group.id),
    }))
    .filter((section) => section.countries.length > 0);
}
