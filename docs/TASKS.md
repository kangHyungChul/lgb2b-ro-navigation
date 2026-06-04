# Global Site Navigator — 구현 작업 목록

기준 문서: [`PRD.md`](./PRD.md), [`RULES.md`](./RULES.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md) · **수행 절차:** [`WORKFLOW.md`](./WORKFLOW.md)

> **범위:** MVP(PRD 주요 기능). 즐겨찾기는 PRD 향후 기능으로 **별도 Phase F**에만 기재.  
> **원칙:** 작업은 **한 번에 하나**만 수행. 이전 작업 완료 기준을 충족한 뒤 다음으로 진행.  
> **Cursor:** 승인·체크·대기 규칙은 [`WORKFLOW.md`](./WORKFLOW.md)를 따른다.

---

## 작업 수행 규칙

1. **기술 스택·코딩 규율**은 [`RULES.md`](./RULES.md)를 따른다 (Next.js 15 App Router, Tailwind v4).
2. 순서: **타입 정의 → 데이터 작성 → utils(Phase 2-B) → 컴포넌트 → 페이지 조립 → 기능 보완 → 테스트**
3. 각 작업의 **완료 기준**을 모두 만족해야 완료로 표시
4. `npm` 사용 (RULES §1)
5. 코드 리뷰 시 해당 작업 ID를 PR 설명에 명시 (§2.2 예외 작업은 예외 사유 명시)

---

## Phase 0 — 프로젝트 스캐폴딩 (선행)

타입·데이터 작업 전에 **한 번만** 수행한다.

### T-000-1 Next.js 15 + TypeScript 프로젝트 생성

**작업:** [`RULES.md`](./RULES.md) §1·§5에 따라 Next.js 15(App Router) + TypeScript strict 프로젝트를 초기화한다. `src/` 하위에 `types`, `data`, `utils`, `hooks`, `components` 디렉터리를 만든다.

**완료 기준:**

- [x] `npm run dev`로 로컬 개발 서버가 기동된다
- [x] `npm run build`(`next build`)가 오류 없이 완료된다
- [x] `app/layout.tsx`, `app/page.tsx` 및 `src/types`, `src/data`, `src/utils`, `src/hooks`, `src/components`가 존재한다

---

### T-000-2 Tailwind CSS v4 + 전역 스타일

**작업:** Tailwind CSS v4를 설정하고 `app/globals.css`에 `@import "tailwindcss"` 진입점을 둔다. `app/page.tsx`는 placeholder만 표시한다.

**완료 기준:**

- [x] Tailwind 유틸리티가 적용된다
- [x] `next dev`·`next build` 모두 정상 동작한다

---

### T-000-3 ESLint · Prettier · EditorConfig · CI

**작업:** [`RULES.md`](./RULES.md) §4에 따라 `eslint-config-next`, Prettier, `.editorconfig`(2칸)를 설정한다. CI는 **T-033 전까지** `next build` + lint만 실행한다 (`npm test`는 T-033에서 Vitest 설정 후 CI에 추가).

**완료 기준:**

- [x] 로컬에서 `npm run lint` 통과
- [x] 들여쓰기 2칸이 포맷터로 강제된다
- [x] CI(또는 문서화된 로컬 스크립트)에서 **build·lint**가 실행된다 (test는 T-033 완료 후 필수)

---

## Phase 1 — 타입 정의

### T-001 `Country` 및 기본 식별 타입 정의

**작업:** `src/types/index.ts`에 `Country` 인터페이스를 정의한다 (`id`, `name`, `nameAliases?`, `countryCode`, `localeCode`).

**완료 기준:**

- [x] ARCHITECTURE §3.2 `Country` 필드와 일치한다
- [x] `tsc --noEmit`(또는 `npm run build`) 통과한다

---

### T-002 URL·환경 관련 타입 정의

**작업:** `UrlTemplate`, `EnvironmentTier`, `EnvironmentKind`, `LinkKind`, `TierUrlTemplates`, `UrlRules` 타입을 정의한다.

**완료 기준:**

- [x] `UrlRules` 구조가 `actual.site`, `site.{dev,stg,prod}`, `admin.{dev,stg,prod}`를 표현한다
- [x] `EnvironmentKind`는 `"prod" | "stg" | "dev"`이다
- [x] 빌드(타입 체크) 통과한다

---

### T-003 파생(Resolved) URL 타입 정의

**작업:** `EnvironmentLinks`, `ResolvedEnvironmentUrls` 타입을 정의한다. `EnvironmentLinks.siteNcms`는 optional.

**완료 기준:**

- [x] PROD 전용 `siteNcms?` 필드가 타입에 반영된다
- [x] `ResolvedEnvironmentUrls`가 prod/stg/dev 키를 모두 갖는다
- [x] 빌드 통과한다

---

## Phase 2 — 데이터 작성

### T-004 `urlRules.ts` 작성

**작업:** `src/data/urlRules.ts`에 ARCHITECTURE §3.2 **확정 템플릿 7개**를 `UrlRules` 타입으로 export한다.

**완료 기준:**

- [x] `actual.site`, `site.dev`, `site.stg`, `site.prod`, `admin.dev`, `admin.stg`, `admin.prod` 값이 문서와 동일하다
- [x] Admin 템플릿에 `#`(hash) fragment가 포함되어 있다
- [x] `UrlRules` 타입으로 export되어 타입 오류가 없다

---

### T-005 `countries.ts` 샘플 데이터 작성 (1차)

**작업:** `src/data/countries.ts`에 MVP 시드 **2건**을 작성한다 (ARCHITECTURE §3.2 URL 정본: `global`, `gb`).

| id     | name           | countryCode | localeCode | nameAliases              |
| ------ | -------------- | ----------- | ---------- | ------------------------ |
| global | Global         | global      | global     | Global, 글로벌           |
| gb     | United Kingdom | gb          | uk         | UK, 영국, United Kingdom |

**완료 기준:**

- [x] 위 2건 URL 치환 필드가 ARCHITECTURE §3.2 예시 A·B와 일치한다
- [x] `id`는 `countryCode`와 동일(`global`, `gb`)
- [x] `Country[]`로 export되고 타입 체크 통과한다

> **후속(Phase G):** `countryGroups`·`groupId`·`pl`/`jp` 예시 4건은 T-005 범위를 넘는 데이터 확장. URL 풀체크(T-039)는 여전히 `global`·`gb` 기준.

---

### T-006 `countries.ts` 데이터 확장 (2차) — **MVP 필수 아님**

**작업:** 운영에 필요한 국가를 추가한다. 검색용 `nameAliases`가 필요한 국가에는 별칭을 넣는다.  
**MVP:** T-005 시드 2건(`global`, `gb`)만으로 T-039·[`TEST_PLAN.md`](./TEST_PLAN.md) 검증 가능. T-006은 **운영 전** 또는 별도 지시 시 진행.

**완료 기준:**

- [ ] 팀이 합의한 국가 목록이 반영되었다 (또는 TODO 국가 목록이 PR/이슈에 명시되었다)
- [ ] `name`·`nameAliases`로 검색 시나리오가 동작할 수준의 데이터가 있다
- [ ] 중복 `id` 없음

---

## Phase 2-B — 유틸리티 함수 (컴포넌트 선행)

데이터·타입에 의존하며, **컴포넌트보다 먼저** 완료한다.

### T-007 `applyTemplate` 구현

**작업:** `src/utils/buildEnvironmentUrls.ts`(또는 `applyTemplate.ts`)에 `{localeCode}`, `{countryCode}` 치환 함수를 구현한다.

**완료 기준:**

- [x] `countryCode = "gb"`, `localeCode = "uk"` 치환 시 ARCHITECTURE §3.2 **예시 A** URL과 일치한다
- [x] `countryCode = "global"`, `localeCode = "global"` 치환 시 **예시 B** URL과 일치한다
- [x] 미치환 `{...}` placeholder가 남으면 **throw** (RULES §6). UI(`EnvironmentPanel` 등)에서 catch 후 한국어 안내·행 미표시 (TEST_PLAN TC-URL-101)
- [x] 순수 함수이며 React에 의존하지 않는다

---

### T-008 `buildEnvironmentUrls` 구현

**작업:** `Country` + `UrlRules` → `ResolvedEnvironmentUrls` 빌드. §3.5 매핑표·PROD `siteNcms` 규칙을 따른다.

**완료 기준:**

- [x] prod: `site`(actual), `siteNcms`(NCMS prod), `admin` 3 URL이 생성된다
- [x] stg/dev: `site`, `admin` 각 1 URL이 생성된다
- [x] Admin URL에 hash fragment가 유지된다
- [x] T-004·T-005 샘플 국가 1건 이상에 대해 수동 실행 시 기대 URL과 일치한다

---

### T-009 `searchCountries` 구현

**작업:** `src/utils/searchCountries.ts`에 국가명·`nameAliases` 대상 **대소문자 무시 부분 문자열** 검색을 구현한다.

**완료 기준:**

- [x] 호출 전 검색어 **`trim()`** (훅·유틸 경계 중 한 곳에서 일관 적용)
- [x] trim 후 빈 문자열 → 입력 배열 **전체** 반환 (ARCHITECTURE §3.6)
- [x] trim 후 `UK` → `UK`와 동일하게 alias/name 매칭
- [x] `name` 또는 `nameAliases` 일부 일치 시 포함
- [x] 대소문자 혼합 검색어에도 동작한다
- [x] 순수 함수이다

---

### T-010 `copyToClipboard` 구현

**작업:** `src/utils/copyToClipboard.ts`에 Clipboard API 래퍼를 구현한다. 실패 시 reject/throw.

**완료 기준:**

- [x] 문자열 인자를 클립보드에 복사한다
- [x] `navigator.clipboard` 미지원·거부 시 호출부가 처리할 수 있게 실패를 전달한다
- [x] 순수 async 함수(또는 Promise 반환)이다

---

## Phase 3 — 컴포넌트 작성

프레젠테이션 컴포넌트는 **props만**으로 동작하도록 작성한다. 데이터 import는 하지 않는다.

### T-011 `Badge` 컴포넌트

**작업:** `src/components/common/Badge.tsx` — 환경 라벨(PROD/STG/DEV) 표시.

**완료 기준:**

- [x] `kind: EnvironmentKind` prop으로 라벨 텍스트가 표시된다
- [x] 스토리/수동 렌더 시 세 환경 모두 구분 가능하다

---

### T-012 `ExternalLink` 컴포넌트

**작업:** `src/components/common/ExternalLink.tsx` — 외부 URL 링크.

**완료 기준:**

- [x] `href`, `children`(또는 label) prop을 받는다
- [x] `target="_blank"`, `rel="noopener noreferrer"`가 적용된다
- [x] 잘못된 `href` 없이 렌더 가능하다

---

### T-013 `CopyButton` 컴포넌트

**작업:** `src/components/common/CopyButton.tsx` — 복사 버튼 + 성공 피드백 UI.

**완료 기준:**

- [x] `text` prop 복사 시 `copyToClipboard`를 호출한다
- [x] 성공 시 시각적 피드백(체크 아이콘·문구 등)이 표시된다
- [x] `onSuccess` 콜백 prop이 있으면 호출된다
- [x] 실패 시 사용자에게 오류가 전달된다(alert 또는 인라인 메시지)

---

### T-014 `LinkRow` 컴포넌트

**작업:** `src/components/environment/LinkRow.tsx` — 라벨, URL(축약 표시 가능), `ExternalLink`, `CopyButton`.

**완료 기준:**

- [x] `label`, `url` prop으로 한 줄 링크 UI가 완성된다
- [x] URL 클릭 시 새 탭에서 열린다
- [x] 복사 버튼이 해당 `url` 전체( hash 포함)를 복사한다

---

### T-015 `EnvironmentSection` 컴포넌트

**작업:** `src/components/environment/EnvironmentSection.tsx` — `Badge` + `LinkRow` 목록.

**완료 기준:**

- [x] `kind`, `links: EnvironmentLinks` prop을 받는다
- [x] `prod`이고 `siteNcms`가 있으면 LinkRow 3개 — 라벨 **「Site」「NCMS」「AEM」** (T-G04; 풀체크 표기는 `Site (실제)` 동일)
- [x] `stg`/`dev`는 LinkRow 2개(Site, Admin)
- [x] 하드코딩 mock `EnvironmentLinks`로 화면 확인 가능하다

---

### T-016 `EnvironmentPanel` 컴포넌트

**작업:** `src/components/environment/EnvironmentPanel.tsx` — 국가명 헤더 + `countryCode`·`localeCode` 표시 + prod/stg/dev `EnvironmentSection` 3개. `buildEnvironmentUrls` throw 시 **크래시 없이** 한국어 안내 또는 섹션/행 미표시 (TEST_PLAN TC-URL-101).

**완료 기준:**

- [x] `country`, `resolvedUrls` prop으로 3개 환경 섹션이 렌더된다
- [x] 헤더 또는 메타 영역에 `countryCode`·`localeCode`가 표시된다 (TEST_PLAN TC-URL-003)
- [x] URL 생성 오류 시 빈 `href` 없음, 사용자에게 한국어 피드백 또는 해당 행 미표시
- [x] mock `Country` + `ResolvedEnvironmentUrls`로 단독 확인 가능하다

---

### T-017 `CountryEmptyState` 컴포넌트

**작업:** `src/components/country/CountryEmptyState.tsx` — 미선택 안내 문구.

**완료 기준:**

- [x] "국가를 선택하세요"(또는 합의된 문구)가 표시된다
- [x] props 없이 렌더 가능하다

---

### T-018 `CountryListItem` 컴포넌트

**작업:** `src/components/country/CountryListItem.tsx` — 국가명, 선택 상태 스타일, 클릭 핸들러.

**완료 기준:**

- [x] `country`, `isSelected`, `onSelect` prop이 동작한다
- [x] 선택 시 `aria-selected` 또는 동등한 접근성 속성이 적용된다

---

### T-019 `CountryList` 컴포넌트

**작업:** `src/components/country/CountryList.tsx` — `CountryListItem` 목록, `role="listbox"`.

**완료 기준:**

- [x] `countries`, `selectedId`, `onSelect` prop으로 목록이 렌더된다
- [x] 빈 배열일 때 빈 상태 UI가 표시된다
- [x] 키보드로 항목 포커스 이동이 가능하다(최소 Tab 포커스)

---

### T-020 `CountrySearchInput` 컴포넌트

**작업:** `src/components/country/CountrySearchInput.tsx` — 검색 입력 필드.

**완료 기준:**

- [x] `value`, `onChange` controlled input이다
- [x] 접근성: `label` 또는 `aria-label`이 있다
- [x] placeholder가 있다(예: "국가명 검색")

---

### T-021 `PageHeader` 컴포넌트

**작업:** `src/components/layout/PageHeader.tsx` — 앱 제목(Global Site Navigator 등).

**완료 기준:**

- [x] 제목이 시맨틱하게 표시된다(`h1` 등)
- [x] 레이아웃에 맞는 기본 스타일이 적용된다

---

### T-022 `AppShell` 컴포넌트

**작업:** `src/components/layout/AppShell.tsx` — 헤더 + 2단(또는 stacked) 메인 레이아웃.

**완료 기준:**

- [x] `children` 또는 좌/우 슬롯으로 목록·패널 영역을 배치할 수 있다
- [x] 좁은 viewport에서 세로 스택 등 반응형이 동작한다

---

## Phase 4 — 페이지 조립

### T-023 `useSelectedCountry` 훅

**작업:** `src/hooks/useSelectedCountry.ts` — `selectedCountryId` + `countries` → `selectedCountry`.

**완료 기준:**

- [x] id가 `null`이면 `selectedCountry`는 `null`이다
- [x] 유효 id면 해당 `Country`를 반환한다
- [x] 존재하지 않는 id면 `null`(또는 합의된 fallback)이다

---

### T-024 `useCountrySearch` 훅

**작업:** `src/hooks/useCountrySearch.ts` — `searchQuery` + `countries` → `filteredCountries`. 처리 순서: **`trim()` → 300ms debounce → `searchCountries`** (ARCHITECTURE §3.6, RULES §7).

**완료 기준:**

- [x] `searchQuery`를 trim한 뒤 debounce·`searchCountries`에 전달한다 (T-009와 중복 trim 없음)
- [x] debounce 300ms 후 `filteredCountries`가 갱신된다
- [x] `searchCountries` 유틸을 사용한다
- [x] 불필요한 재계산이 없다(`useMemo`)

---

### T-025 페이지 컨테이너 1차 — 상태·데이터 연결

**작업:** `app/page.tsx`(또는 `NavigatorClient.tsx`)에서 `countries`, `urlRules` import, `searchQuery`·`selectedCountryId` state, 훅·`buildEnvironmentUrls` 연결.

**완료 기준:**

- [x] `selectedCountryId` 초기값은 **`null`** (TEST_PLAN TC-SEL-001)
- [x] 국가 선택 시 `resolvedUrls`가 계산된다
- [x] 컴포넌트 트리에 props로만 데이터가 전달된다(프레젠테이션 컴포넌트가 `data/` 직접 import하지 않음)
- [x] dev 서버에서 오류 없이 로드된다

---

### T-026 페이지 레이아웃 조립 2차 — 전체 UI 연결

**작업:** `AppShell` + `PageHeader` + `CountrySearchInput` + `CountryList` + (`CountryEmptyState` | `EnvironmentPanel`) 조립. **검색·debounce·패널 유지**를 T-024 훅과 연결한다 (T-028은 회귀 점검).

**완료 기준:**

- [x] PRD: 국가 선택, 환경별 링크 표시가 한 화면에서 동작한다
- [x] 미선택 시 `CountryEmptyState`, 선택 시 `EnvironmentPanel`이 보인다
- [x] PROD에 Site(실제)·Site(NCMS)·Admin이 표시된다 (T-015 라벨)
- [x] 검색 입력이 trim → debounce 300ms → 목록 필터로 동작한다
- [x] 필터에 선택 국가가 없어도 `EnvironmentPanel`·`selectedCountryId` 유지 (RULES §7)
- [x] PRD 「국가명 검색」·「국가 선택」·「환경별 링크」가 한 화면에서 동작한다

---

### T-027 `app/layout.tsx` 정리

**작업:** 루트 레이아웃에 Next.js **`metadata`**(앱 제목·description 등)·`globals.css`·기본 HTML 구조를 정리한다. (`index.html` 수동 편집이 아닌 App Router 방식)

**완료 기준:**

- [x] `app/layout.tsx` `metadata`로 브라우저 탭 제목이 "Global Site Navigator"(또는 합의명)이다
- [x] 프로덕션 빌드 산출물이 정상 동작한다
- [x] 콘솔에 마운트 관련 치명적 오류가 없다

---

## Phase 5 — 기능 보완

### T-028 검색·패널 UX 회귀 점검

**작업:** T-026에서 연결된 검색·debounce·패널 유지·trim을 [`TEST_PLAN.md`](./TEST_PLAN.md) TC-SRH·TC-SRH-005 기준으로 **회귀 점검**한다. 신규 대규모 연동은 T-026 범위.

**완료 기준:**

- [x] TC-SRH-001~008, 201, 202에 해당하는 동작이 수동 또는 T-037/038으로 확인되었다
- [x] 필터 결과에 선택 국가가 없어도 패널 유지(한국어 안내 문구는 권장, TEST_PLAN)
- [x] T-026에서 누락된 검색 버그가 있으면 수정(범위는 검색·패널만)

---

### T-029 링크 복사 UX 완성

**작업:** 모든 `LinkRow`에서 복사·피드백이 동작하는지 점검. `aria-live` 영역 추가(ARCHITECTURE §4.5).

**완료 기준:**

- [x] PROD/STG/DEV 모든 링크에서 복사 시 **hash 포함 전체 URL**이 복사된다
- [x] 복사 성공 시 스크린리더/라이브 영역으로 "복사됨" 안내가 가능하다
- [x] PRD "링크 복사" 충족

---

### T-030 스타일·토큰 정리

**작업:** `app/globals.css` 및 Tailwind 테마로 간격·색·타이포를 정리해 내부 도구로서 가독성을 확보한다.

**완료 기준:**

- [x] 2단 레이아웃에서 목록·패널이 시각적으로 구분된다
- [x] 선택된 국가·환경 Badge가 한눈에 구분된다
- [x] 모바일 너비에서 가로 스크롤 없이 사용 가능하다

---

### T-031 접근성 보완

**작업:** 목록·검색·복사·외부 링크에 대한 접근성 속성을 점검·보완한다.

**완료 기준:**

- [x] `CountryList` `role="listbox"`, 항목 `aria-selected` 적용
- [x] 검색 필드에 accessible name 존재
- [x] 외부 링크 `rel`/`target` 준수
- [x] 키보드만으로 국가 선택·링크 열기·복사가 가능하다

---

### T-032 `public` 정적 자산 (favicon)

**작업:** `public/favicon.ico`(또는 동등 아이콘)를 추가한다. **탭 제목·meta는 T-027 `metadata`** 담당.

**완료 기준:**

- [x] favicon이 표시된다(없으면 기본 아이콘 대체 명시)
- [x] T-027 `metadata` title과 중복 설정 없이 역할이 분리되어 있다

---

## Phase 6 — 테스트

테스트 러너(**Vitest**, RULES §9)는 **T-033**에서 한 번만 설정한다.

### T-033 테스트 환경 설정

**작업:** **Vitest** + React Testing Library + jsdom 설정. `vitest.config.ts`에서 `@/` alias를 `tsconfig`와 맞춘다 (RULES §9).

**완료 기준:**

- [x] `npm test`(또는 `npm run test`)가 CI/로컬에서 실행된다 (**CI에 test 단계 추가** — T-000-3은 build·lint만)
- [x] 샘플 테스트 1개가 통과한다

---

### T-034 `applyTemplate` / `buildEnvironmentUrls` 단위 테스트

**작업:** ARCHITECTURE §3.2 예시 A(`gb`/`uk`)·B(`global`) 및 prod `siteNcms`·Admin hash 케이스 테스트.

**완료 기준:**

- [x] prod Site(실제)·Site(NCMS)·Admin URL assertion 통과
- [x] stg/dev Site·Admin assertion 통과
- [x] hash fragment 유지 assertion 통과
- [x] 잘못된 placeholder 방어 케이스 통과(구현한 경우)

---

### T-035 `searchCountries` 단위 테스트

**작업:** 빈 검색어, trim(공백만·앞뒤 공백), name 일치, alias 일치, 대소문자 무시 케이스 (ARCHITECTURE §3.6, TEST_PLAN TC-SRH-102·103).

**완료 기준:**

- [x] trim 후 빈 문자열 → 전체 반환
- [x] `UK` → United Kingdom 매칭
- [x] 위 시나리오 테스트가 모두 통과한다

---

### T-036 `copyToClipboard` 단위 테스트

**작업:** `navigator.clipboard` mock 성공/실패 케이스.

**완료 기준:**

- [x] 성공 시 resolve, 실패 시 reject/throw가 검증된다

---

### T-037 `useCountrySearch` / `useSelectedCountry` 훅 테스트

**작업:** `renderHook`으로 필터·선택 국가 반환 검증.

**완료 기준:**

- [x] 검색어 변경 시 filtered 개수 변화가 검증된다
- [x] trim·debounce 반영 시 필터 결과가 기대와 일치 (가능 시 fake timer)
- [x] selectedId 변경 시 `selectedCountry`가 검증된다

---

### T-038 핵심 컴포넌트 통합 테스트

**작업:** RTL로 `CountryList` 필터 렌더, 국가 선택 시 `EnvironmentPanel` 표시, `LinkRow` 복사 버튼 mock 테스트.

**완료 기준:**

- [x] 검색 후 목록 개수 변경 assertion 통과
- [x] 국가 클릭 후 환경 섹션(PROD 3링크) 노출 assertion 통과
- [x] Copy 클릭 시 clipboard mock 호출 assertion 통과

---

### T-039 MVP 수동 QA 체크리스트 실행

**작업:** [`TEST_PLAN.md`](./TEST_PLAN.md) §12 게이트 기준으로 수동 점검 후 §11 템플릿에 결과를 PR 또는 이슈에 기록한다.

**완료 기준:**

- [x] TEST_PLAN §12.1·§12.2 MVP QA 게이트 **전항 Pass**
- [x] `npm run build` + `npm run start` 환경에서 TC-URL-005·006(풀체크) 수행
- [x] TC-OPS-001~003 포함
- [x] 시드 2건(`global`, `gb`) URL이 ARCHITECTURE §3.2 예시 A·B와 일치

---

## Phase G — MVP 후 UX·데이터 (2026-06)

MVP(T-039) 완료 **이후** 반영. TEST_PLAN §12.1은 `global`·`gb` URL 정본 유지.

| ID     | 작업 | 완료 기준 요약 |
| ------ | ---- | -------------- |
| T-G01  | UI 환경 노출 순서 **DEV → STG → PROD** | `envOrder.ts` + `EnvironmentPanel` 순서, TC-URL-001 |
| T-G02  | 국가 그룹 (`countryGroups`, `groupId`) | `groupCountries.ts`, `CountryList` 그룹 헤더·빈 그룹 숨김, 단위 테스트 |
| T-G03  | 시드 4건 + 1그룹 예시 (`pl`, `jp`) | ARCHITECTURE §3.2 시드 표, T-006과 병행 가능 |
| T-G04  | UI 단순화 (라벨 Site/NCMS/AEM, 한 줄 LinkRow) | ARCHITECTURE §4.2 |
| T-G05  | 레이아웃 (폭·카드) | ARCHITECTURE §4.6, `.gsn-app` 60rem·단일 카드 border |
| T-G06  | NCMS 접속 프로브 배지 | global prod NCMS `fetch`(no-cors), 헤더 녹/적 배지 |

**완료:** T-G01~G06 — [x] (코드·문서 동기화 2026-06-04)

---

## Phase F — 향후 (PRD 범위 외, MVP 후)

MVP 완료 후 **별도 작업**으로 진행한다.

| ID    | 작업                          | 완료 기준 요약                |
| ----- | ----------------------------- | ----------------------------- |
| T-F01 | `useFavorites` + localStorage | 즐겨찾기 토글·유지            |
| T-F02 | `CountryListItem` 즐겨찾기 UI | 별 아이콘·정렬(즐겨찾기 우선) |
| T-F03 | 즐겨찾기 테스트               | localStorage mock·정렬 검증   |

---

## PRD ↔ 작업 매핑

| PRD 기능               | 관련 작업                                 |
| ---------------------- | ----------------------------------------- |
| 국가 선택              | T-018~019, T-023, T-026, **T-G02** (그룹) |
| 환경 정보 조회         | T-015~016, T-008, T-026, **T-G01** (순서) |
| 환경별 Site·Admin 링크 | T-004, T-008, T-014~016                   |
| 링크 복사              | T-010, T-013~014, T-029                   |
| 국가명 검색            | T-009, T-020, T-024, T-026, T-028(회귀)   |
| 즐겨찾기 (향후)        | Phase F                                   |

---

## 권장 진행 일정 (참고)

| 주차    | 목표                          |
| ------- | ----------------------------- |
| 1일차   | Phase 0(T-000-1~3)~1 완료     |
| 2일차   | Phase 2 + 2-B(T-007~010) 완료 |
| 3~4일차 | Phase 3 컴포넌트              |
| 5일차   | Phase 4 페이지 조립           |
| 6일차   | Phase 5 보완 + Phase 6 테스트 |

실제 일정은 국가 데이터(T-006) 규모에 따라 조정한다.
