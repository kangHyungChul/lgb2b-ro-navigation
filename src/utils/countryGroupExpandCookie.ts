import type { CountryGroup } from "@/types";

/** 그룹별 펼침 상태를 저장하는 쿠키 이름 */
export const COUNTRY_GROUP_EXPAND_COOKIE_NAME = "gsn-country-group-expanded";

/** 쿠키 유효 기간(초) — 약 1년 */
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/**
 * countries.ts의 defaultExpanded로 그룹별 초기 맵을 만든다.
 * defaultExpanded가 없으면 true(펼침)로 간주한다.
 */
export function buildDefaultExpandedMap(
  groups: CountryGroup[]
): Record<string, boolean> {
  return Object.fromEntries(
    groups.map((group) => [
      group.id,
      group.defaultExpanded !== false,
    ])
  );
}

/**
 * 쿠키 JSON과 SSoT 그룹 목록을 합친다.
 * 쿠키에 없는 id는 defaultExpanded를 쓰고, 알 수 없는 id는 무시한다.
 */
export function mergeExpandedMapWithGroups(
  groups: CountryGroup[],
  fromCookie: Record<string, boolean> | null
): Record<string, boolean> {
  const defaults = buildDefaultExpandedMap(groups);
  if (!fromCookie) {
    return defaults;
  }
  return Object.fromEntries(
    groups.map((group) => [
      group.id,
      typeof fromCookie[group.id] === "boolean"
        ? fromCookie[group.id]
        : defaults[group.id],
    ])
  );
}

/**
 * document.cookie 문자열에서 그룹 펼침 맵을 읽는다.
 * 파싱 실패·형식 오류 시 null.
 */
export function readCountryGroupExpandCookie(
  cookieHeader: string = typeof document !== "undefined"
    ? document.cookie
    : ""
): Record<string, boolean> | null {
  if (!cookieHeader) {
    return null;
  }

  const escapedName = COUNTRY_GROUP_EXPAND_COOKIE_NAME.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${escapedName}=([^;]*)`)
  );
  if (!match?.[1]) {
    return null;
  }

  try {
    const decoded = decodeURIComponent(match[1]);
    const parsed: unknown = JSON.parse(decoded);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    const result: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "boolean") {
        result[key] = value;
      }
    }
    return Object.keys(result).length > 0 ? result : null;
  } catch {
    return null;
  }
}

/** 그룹 id → 펼침 여부 맵을 쿠키에 저장한다 (브라우저에서만 호출). */
export function writeCountryGroupExpandCookie(
  expandedByGroupId: Record<string, boolean>
): void {
  if (typeof document === "undefined") {
    return;
  }
  const value = encodeURIComponent(JSON.stringify(expandedByGroupId));
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${COUNTRY_GROUP_EXPAND_COOKIE_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}
