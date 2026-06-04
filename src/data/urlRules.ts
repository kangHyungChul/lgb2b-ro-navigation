import type { UrlRules } from "@/types";

/**
 * URL 조합 템플릿 SSoT (ARCHITECTURE §3.2 확정 7개)
 * 완성 URL은 저장하지 않음 — {localeCode}·{countryCode}는 countries.ts 값으로 런타임 치환
 */
export const urlRules: UrlRules = {
  actual: {
    // 실제(운영) Site — localeCode만 치환
    site: "https://lg.com/{localeCode}/business",
  },
  site: {
    dev: "https://ncms-btb-auth.gp1dev.aws.lge.com/{localeCode}/business",
    stg: "https://ncms-btb-auth.gp1stg.aws.lge.com/{localeCode}/business",
    prod: "https://ncms-btb-auth.gp1.aws.lge.com/{localeCode}/business",
  },
  admin: {
    // AEM Author — countryCode 치환, ui# fragment는 SPA 라우팅용으로 템플릿에 유지
    dev: "https://author-p155411-e1648827.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/{countryCode}",
    stg: "https://author-p155411-e1648867.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/{countryCode}",
    prod: "https://author-p155411-e1648866.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/{countryCode}",
  },
};
