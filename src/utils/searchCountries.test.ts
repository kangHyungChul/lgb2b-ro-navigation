import { describe, expect, it } from "vitest";
import { countries } from "@/data/countries";
import { searchCountries } from "@/utils/searchCountries";

describe("searchCountries", () => {
  it("trim 후 빈 문자열 → 전체", () => {
    expect(searchCountries(countries, "")).toHaveLength(22);
    expect(searchCountries(countries, "   ")).toHaveLength(22);
  });

  it("UK → United Kingdom (대소문자 무시)", () => {
    expect(searchCountries(countries, "UK")).toHaveLength(1);
    expect(searchCountries(countries, "uk")[0].id).toBe("gb");
  });

  it("name 부분 일치", () => {
    expect(searchCountries(countries, "United")).toHaveLength(1);
  });

  it("앞뒤 공백 trim 후 매칭", () => {
    expect(searchCountries(countries, "  global  ")).toHaveLength(1);
  });
});
