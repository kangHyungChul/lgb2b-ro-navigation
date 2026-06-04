import { describe, expect, it } from "vitest";
import { linkRowLabel, linkRowLabelForSite } from "@/utils/linkRowLabel";

describe("linkRowLabel", () => {
  it("ncms 호스트는 NCMS", () => {
    expect(
      linkRowLabel(
        "https://ncms-btb-auth.gp1dev.aws.lge.com/uk/business",
        "site"
      )
    ).toBe("NCMS");
  });

  it("lg.com Site는 Site", () => {
    expect(linkRowLabel("https://lg.com/uk/business", "site")).toBe("Site");
  });

  it("AEM Author는 AEM", () => {
    expect(
      linkRowLabel(
        "https://author-p155411-e1648866.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/gb",
        "admin"
      )
    ).toBe("AEM");
  });

  it("다중 로케일 Site 라벨에 접미", () => {
    expect(
      linkRowLabelForSite(
        "https://lg.com/ca_en/business",
        { localeCode: "ca_en", label: "EN", site: "" },
        true
      )
    ).toBe("Site (EN)");
  });
});
