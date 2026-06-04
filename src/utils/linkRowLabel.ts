import type { ResolvedSiteLocale } from "@/types";

/** 링크 행 좌측 라벨 — ncms 호스트는 NCMS, AEM은 AEM, 그 외 Site */
export function linkRowLabel(url: string, role: "site" | "admin"): string {
  const trimmed = url.trim();
  if (!trimmed) {
    return role === "admin" ? "AEM" : "Site";
  }

  try {
    const host = new URL(trimmed).hostname.toLowerCase();
    if (host.startsWith("ncms")) {
      return "NCMS";
    }
    if (role === "admin" || host.includes("adobeaemcloud")) {
      return "AEM";
    }
    return "Site";
  } catch {
    return role === "admin" ? "AEM" : "Site";
  }
}

/** 다중 로케일일 때 라벨에 localeCode(또는 label) 접미 */
export function linkRowLabelForSite(
  url: string,
  siteLocale: ResolvedSiteLocale,
  multipleLocales: boolean
): string {
  const base = linkRowLabel(url, "site");
  if (!multipleLocales) {
    return base;
  }
  const suffix = siteLocale.label ?? siteLocale.localeCode;
  return `${base} (${suffix})`;
}
