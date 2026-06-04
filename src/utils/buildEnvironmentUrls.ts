import type {
  Country,
  EnvironmentKind,
  EnvironmentLinks,
  LinkKind,
  ResolvedEnvironmentUrls,
  ResolvedSiteLocale,
  UrlRules,
  UrlTemplate,
} from "@/types";
import { applyTemplate } from "./applyTemplate";
import { countryForLocale, getCountryLocales } from "./countryLocales";

/**
 * UI 환경·링크 종류 → urlRules 템플릿 선택 (ARCHITECTURE §3.5 매핑표)
 */
export function resolveTemplate(
  kind: EnvironmentKind,
  link: LinkKind,
  rules: UrlRules
): UrlTemplate {
  if (link === "site") {
    if (kind === "prod") {
      return rules.actual.site;
    }
    return rules.site[kind];
  }
  return rules.admin[kind];
}

function buildSitesForKind(
  country: Country,
  kind: EnvironmentKind,
  rules: UrlRules
): ResolvedSiteLocale[] {
  return getCountryLocales(country).map((loc) => {
    const c = countryForLocale(country, loc.localeCode);

    if (kind === "prod") {
      return {
        localeCode: loc.localeCode,
        label: loc.label,
        site: applyTemplate(resolveTemplate("prod", "site", rules), c),
        siteNcms: applyTemplate(rules.site.prod, c),
      };
    }

    return {
      localeCode: loc.localeCode,
      label: loc.label,
      site: applyTemplate(resolveTemplate(kind, "site", rules), c),
    };
  });
}

function buildLinksForKind(
  country: Country,
  kind: EnvironmentKind,
  rules: UrlRules
): EnvironmentLinks {
  const c = country;
  return {
    sites: buildSitesForKind(country, kind, rules),
    admin: applyTemplate(resolveTemplate(kind, "admin", rules), c),
  };
}

/**
 * Country + UrlRules → 화면·복사용 ResolvedEnvironmentUrls
 * 다중 locales 시 Site·NCMS는 로케일마다, Admin은 countryCode 1건
 */
export function buildEnvironmentUrls(
  country: Country,
  rules: UrlRules
): ResolvedEnvironmentUrls {
  return {
    prod: buildLinksForKind(country, "prod", rules),
    stg: buildLinksForKind(country, "stg", rules),
    dev: buildLinksForKind(country, "dev", rules),
  };
}
