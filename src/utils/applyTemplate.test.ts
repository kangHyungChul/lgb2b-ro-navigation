import { describe, expect, it } from "vitest";
import type { Country } from "@/types";
import { applyTemplate } from "@/utils/applyTemplate";

const gb: Country = {
  id: "gb",
  name: "United Kingdom",
  countryCode: "gb",
  localeCode: "uk",
  groupId: "group1",
};

describe("applyTemplate", () => {
  it("치환 예시 A — gb/uk Site", () => {
    expect(applyTemplate("https://lg.com/{localeCode}/business", gb)).toBe(
      "https://lg.com/uk/business"
    );
  });

  it("치환 예시 A — Admin hash 유지", () => {
    const url = applyTemplate(
      "https://author.example.com/ui#/aem/sites.html/content/lgebtb/{countryCode}",
      gb
    );
    expect(url).toContain("#/aem/");
    expect(url).toContain("/gb");
  });

  it("치환 예시 B — global", () => {
    const global: Country = {
      id: "global",
      name: "Global",
      countryCode: "global",
      localeCode: "global",
      groupId: "opened",
    };
    expect(applyTemplate("https://lg.com/{localeCode}/business", global)).toBe(
      "https://lg.com/global/business"
    );
  });

  it("미치환 placeholder는 throw", () => {
    expect(() =>
      applyTemplate("https://x/{unknown}", gb)
    ).toThrow(/미치환 placeholder/);
  });
});
