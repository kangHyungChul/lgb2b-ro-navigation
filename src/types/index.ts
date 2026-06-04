/**
 * 도메인 타입 계약 (ARCHITECTURE §3.2 정본)
 * T-001: Country · T-002: UrlRules 계열 · T-003: 파생 URL 타입
 */

// --- T-001: 국가 엔트리 (countries.ts에 저장) ---

/** 국가 목록·즐겨찾기·URL 치환에 쓰는 단일 국가 레코드 */
export interface Country {
  /** 앱 내부 고유 ID (목록 key, 즐겨찾기 localStorage 키). MVP에서는 countryCode와 동일 */
  id: string;
  /** UI 표시용 국가명 (데이터 그대로, 번역 없음) */
  name: string;
  /** 검색 확장용 별칭 (예: UK, 영국). 없으면 name만 검색 */
  nameAliases?: string[];
  /** Admin URL 템플릿 치환값 — AEM content path 세그먼트 (예: gb, global) */
  countryCode: string;
  /**
   * Site URL 템플릿 치환값 — 단일 로케일 국가의 기본값 (예: uk, global).
   * `locales`가 있으면 첫 항목과 맞추는 것을 권장
   */
  localeCode: string;
  /**
   * 다중 언어 Site·NCMS (예: ca_en, ca_fr).
   * 있으면 tier별 Site/NCMS 링크를 로케일마다 생성하고, Admin은 countryCode 1건
   */
  locales?: CountryLocale[];
  /** 목록 그룹 ID — countryGroups[].id 와 매칭 */
  groupId: string;
}

/** 국가별 Site 로케일 변형 (countries.ts) */
export interface CountryLocale {
  /** NCMS·실제 Site 경로 세그먼트 (예: ca_en, ca_fr) */
  localeCode: string;
  /** 링크 행 보조 라벨 (예: EN). 없으면 localeCode */
  label?: string;
}

/** 국가 목록 섹션 제목 (countries.ts SSoT, 노출 순서는 배열 순서) */
export interface CountryGroup {
  /** 그룹 식별자 */
  id: string;
  /** UI 표시 라벨 (한국어) */
  label: string;
  /**
   * 최초 방문·쿠키 없음 시 접기/펼치기 초기값.
   * 생략 시 true(펼침). 사용자가 토글하면 쿠키가 우선한다.
   */
  defaultExpanded?: boolean;
}

// --- T-002: URL 템플릿·환경 tier (urlRules.ts에 저장) ---

/** https://.../{localeCode}|{countryCode} 형태의 단일 템플릿 문자열 */
export type UrlTemplate = string;

/** NCMS·AEM tier 키 (urlRules.site / urlRules.admin 하위) */
export type EnvironmentTier = "dev" | "stg" | "prod";

/** UI 환경 섹션 라벨 (PROD / STG / DEV) — resolveTemplate·패널 매핑용 */
export type EnvironmentKind = "dev" | "stg" | "prod";

/** Site vs Admin 링크 종류 — resolveTemplate(kind, link) 입력 */
export type LinkKind = "site" | "admin";

/** dev·stg·prod 각 tier별 UrlTemplate 묶음 */
export interface TierUrlTemplates {
  dev: UrlTemplate;
  stg: UrlTemplate;
  prod: UrlTemplate;
}

/** 전역 URL 조합 규칙 SSoT (완성 URL 저장 금지) */
export interface UrlRules {
  /** 실제(운영) Site — localeCode만 치환 */
  actual: {
    site: UrlTemplate;
  };
  /** NCMS 개발환경 Site — tier별 localeCode 치환 */
  site: TierUrlTemplates;
  /** AEM Author — tier별 countryCode 치환, hash fragment 템플릿에 포함 */
  admin: TierUrlTemplates;
}

// --- T-003: buildEnvironmentUrls 출력 (저장하지 않음) ---

/** 로케일별 Site·NCMS 조합 결과 */
export interface ResolvedSiteLocale {
  localeCode: string;
  label?: string;
  /** prod: actual.site, stg/dev: NCMS site.{tier} */
  site: string;
  /** PROD NCMS (site.prod). stg/dev에는 없음 */
  siteNcms?: string;
}

/** 한 UI 환경(prod|stg|dev)에서 노출할 조합된 절대 URL */
export interface EnvironmentLinks {
  /** 로케일별 Site(·NCMS). 단일 로케일이면 길이 1 */
  sites: ResolvedSiteLocale[];
  /** Admin Author URL — countryCode 1건 */
  admin: string;
}

/** 선택 국가에 대해 3개 환경 모두의 링크 묶음 */
export interface ResolvedEnvironmentUrls {
  dev: EnvironmentLinks;
  stg: EnvironmentLinks;
  prod: EnvironmentLinks;
}
