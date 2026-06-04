import { describe, expect, it } from "vitest";
import { countries } from "@/data/countries";
import { formatLocaleCodesDisplay, getCountryLocales } from "@/utils/countryLocales";

describe("countryLocales", () => {
  it("locales 없으면 localeCode 1건", () => {
    const gb = countries.find((c) => c.id === "gb")!;
    expect(getCountryLocales(gb)).toEqual([{ localeCode: "uk" }]);
    expect(formatLocaleCodesDisplay(gb)).toBe("uk");
  });

  it("ca는 ca_en, ca_fr", () => {
    const ca = countries.find((c) => c.id === "ca")!;
    expect(getCountryLocales(ca)).toHaveLength(2);
    expect(formatLocaleCodesDisplay(ca)).toBe("ca_en, ca_fr");
  });
});
