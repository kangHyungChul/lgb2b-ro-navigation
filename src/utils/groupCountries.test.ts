import { describe, expect, it } from "vitest";
import { countries, countryGroups } from "@/data/countries";
import { groupCountries } from "@/utils/groupCountries";

describe("groupCountries", () => {
  it("OPENED·GROUP1·GROUP2 순서·소속 국가를 유지한다", () => {
    const sections = groupCountries(countryGroups, countries);

    expect(sections).toHaveLength(3);
    expect(sections[0].group.label).toBe("OPENED");
    expect(sections[0].countries.map((c) => c.id)).toEqual([
      "global",
      "in",
      "br",
      "au",
      "de",
      "sa",
    ]);
    expect(sections[1].group.label).toBe("GROUP1");
    expect(sections[1].countries.map((c) => c.id)).toEqual([
      "th",
      "gb",
      "fr",
      "pa",
      "mx",
      "co",
      "tr",
      "pl",
    ]);
    expect(sections[2].group.label).toBe("GROUP2");
    expect(sections[2].countries.map((c) => c.id)).toEqual([
      "ph",
      "za",
      "pe",
      "ma",
      "vn",
      "pt",
      "id",
      "ca",
    ]);
  });

  it("필터 결과에 없는 그룹은 제외한다", () => {
    const onlyGb = countries.filter((c) => c.id === "gb");
    const sections = groupCountries(countryGroups, onlyGb);

    expect(sections).toHaveLength(1);
    expect(sections[0].group.id).toBe("group1");
  });
});
