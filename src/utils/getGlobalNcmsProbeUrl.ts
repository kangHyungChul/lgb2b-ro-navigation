import { countries } from "@/data/countries";
import { urlRules } from "@/data/urlRules";
import { buildEnvironmentUrls } from "@/utils/buildEnvironmentUrls";

/**
 * 페이지 로드 시 NCMS 접속 프로브용 URL — global + prod NCMS (ARCHITECTURE §3.2)
 */
export function getGlobalNcmsProbeUrl(): string {
  const global = countries.find((c) => c.id === "global");
  if (!global) {
    throw new Error("getGlobalNcmsProbeUrl: global 국가 시드가 없습니다");
  }

  const urls = buildEnvironmentUrls(global, urlRules);
  const ncms = urls.prod.sites[0]?.siteNcms;
  if (!ncms?.trim()) {
    throw new Error("getGlobalNcmsProbeUrl: global prod NCMS URL이 없습니다");
  }

  return ncms;
}
