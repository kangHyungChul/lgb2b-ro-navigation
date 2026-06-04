import { describe, expect, it } from "vitest";
import { countries } from "@/data/countries";
import { urlRules } from "@/data/urlRules";
import { buildEnvironmentUrls } from "@/utils/buildEnvironmentUrls";

const gb = countries.find((c) => c.id === "gb")!;
const global = countries.find((c) => c.id === "global")!;
const ca = countries.find((c) => c.id === "ca")!;

describe("buildEnvironmentUrls", () => {
  it("예시 A — gb prod Site(실제)·NCMS·Admin", () => {
    const urls = buildEnvironmentUrls(gb, urlRules);
    expect(urls.prod.sites).toHaveLength(1);
    expect(urls.prod.sites[0].site).toBe("https://lg.com/uk/business");
    expect(urls.prod.sites[0].siteNcms).toBe(
      "https://ncms-btb-auth.gp1.aws.lge.com/uk/business"
    );
    expect(urls.prod.admin).toBe(
      "https://author-p155411-e1648866.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/gb"
    );
    expect(urls.prod.admin).toContain("#");
  });

  it("예시 A — gb stg/dev", () => {
    const urls = buildEnvironmentUrls(gb, urlRules);
    expect(urls.stg.sites[0].site).toBe(
      "https://ncms-btb-auth.gp1stg.aws.lge.com/uk/business"
    );
    expect(urls.stg.admin).toContain("/gb");
    expect(urls.dev.sites[0].site).toBe(
      "https://ncms-btb-auth.gp1dev.aws.lge.com/uk/business"
    );
    expect(urls.dev.admin).toContain("/gb");
    expect(urls.stg.sites[0].siteNcms).toBeUndefined();
  });

  it("예시 B — global prod", () => {
    const urls = buildEnvironmentUrls(global, urlRules);
    expect(urls.prod.sites[0].site).toBe("https://lg.com/global/business");
    expect(urls.prod.sites[0].siteNcms).toBe(
      "https://ncms-btb-auth.gp1.aws.lge.com/global/business"
    );
    expect(urls.prod.admin).toContain("/global");
  });

  it("다중 로케일 — ca prod/stg Site·NCMS 2건, Admin 1건", () => {
    const urls = buildEnvironmentUrls(ca, urlRules);
    expect(urls.prod.sites).toHaveLength(2);
    expect(urls.prod.sites[0].site).toBe(
      "https://lg.com/ca_en/business"
    );
    expect(urls.prod.sites[0].siteNcms).toBe(
      "https://ncms-btb-auth.gp1.aws.lge.com/ca_en/business"
    );
    expect(urls.prod.sites[1].site).toBe(
      "https://lg.com/ca_fr/business"
    );
    expect(urls.prod.sites[1].siteNcms).toBe(
      "https://ncms-btb-auth.gp1.aws.lge.com/ca_fr/business"
    );
    expect(urls.prod.admin).toContain("/lgebtb/ca");
    expect(urls.stg.sites).toHaveLength(2);
    expect(urls.stg.sites[1].site).toContain("/ca_fr/business");
  });
});
