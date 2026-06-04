# Global Site Navigator — 개발 규칙 (RULES)

## 목적

본 문서는 **구현 표준**(기술 스택·코딩·리뷰·테스트)이다.  
신규 구현·PR·리팩터링은 본 문서와 [`TASKS.md`](./TASKS.md)를 따른다. **Cursor가 구현할 때** [`WORKFLOW.md`](./WORKFLOW.md) 절차(작업 1건·승인·체크)를 따른다.

---

## 문서 우선순위 (충돌 시)

| 순위 | 문서                                   | 역할                                                             |
| ---- | -------------------------------------- | ---------------------------------------------------------------- |
| 1    | [`PRD.md`](./PRD.md)                   | **무엇을** 제공할지 (제품 범위)                                  |
| 2    | **본 문서**                            | **어떻게** 구현할지 (스택·코드·테스트)                           |
| 3    | [`TASKS.md`](./TASKS.md)               | 작업 ID·순서·완료 기준                                           |
| 4    | [`ARCHITECTURE.md`](./ARCHITECTURE.md) | 도메인·URL·컴포넌트·상태 (**§3·§4 역할·계약**, URL 템플릿 상세)  |
| —    | [`WORKFLOW.md`](./WORKFLOW.md)         | **에이전트 수행 절차** (제품·기술 내용과 충돌 시 본 표 1~4 우선) |

**충돌 해석**

- 제품 기능 추가/변경 → **PRD** 우선. 구현 방식은 RULES(Next·Tailwind 등)를 지키며 TASKS에 작업을 추가한다.
- URL·컴포넌트 **계약** → **ARCHITECTURE §3·§4** 우선. 폴더·빌드·스타일 → **본 문서 §1·§5**.
- `ARCHITECTURE` §2 트리는 **역할 참고**. 물리 경로는 **§5 디렉터리**가 정본이다.

---

## 1. 기술 스택

| 항목          | 규칙                                                                     |
| ------------- | ------------------------------------------------------------------------ |
| 런타임        | **Node.js 20 LTS** (`.nvmrc` 또는 `package.json` `engines` 권장)         |
| 프레임워크    | **Next.js 15** — **App Router** (`pages/` 신규 금지)                     |
| UI            | **React 19** (Next 15 권장 조합)                                         |
| 언어          | **TypeScript `strict: true`**                                            |
| 스타일        | **Tailwind CSS v4** — `app/globals.css`에서 `@import "tailwindcss"` 진입 |
| 패키지 매니저 | **npm**                                                                  |
| 데이터        | 정적 `countries` + `urlRules`, **백엔드 API 없음**                       |
| 배포          | **Node 서버** — `next build` + `next start` (Vercel/내부 Node 등)        |

**금지:** Vite·CRA 등 다른 번들러/프레임워크, **정적 export만으로 운영** (`output: 'export'`를 기본으로 두지 않음).

**도입 금지 (TASKS 없이):** Server Actions, Route Handler, Middleware, Edge 전용 분기 — 필요 시 TASKS·ARCHITECTURE 선행.

---

## 2. 작업 범위

### 2.1 TASKS 연동

| 구분                                     | TASKS 작업 ID            |
| ---------------------------------------- | ------------------------ |
| 신규 기능·화면·라우트·컴포넌트 책임 변경 | **필수**                 |
| 동작 동일 리팩터(이름·파일 이동)         | 권장 (범위 큰 경우 필수) |
| §2.2 예외 항목                           | **불필요**               |

PR·커밋에 작업 ID(예: `T-008`) 또는 §2.2 예외 유형을 명시한다.  
PRD 향후 기능(즐겨찾기)은 **TASKS Phase F** 있을 때만.

### 2.2 TASKS 없이 허용

- 버그·회귀 수정, `npm audit` 패치
- `countries.ts` / `urlRules.ts` **만** 수정 (완성 URL 저장 금지)
- 문서 동기화 (PRD / ARCHITECTURE / TASKS / RULES)
- 회귀 테스트·mock 보강 (§9)
- **T-000 범위:** ESLint(`eslint-config-next`)·Prettier·`.editorconfig`(2칸)·CI의 `next build` + lint (**`npm test`는 T-033에서 CI 추가**)

**금지:** TASKS·PRD·ARCHITECTURE에 없는 **신규 사용자 기능**.

### 2.3 제품 범위

MVP는 [`PRD.md`](./PRD.md) 주요 기능에 한정한다. 세부는 PRD를 따른다.

---

## 3. 구현 순서

[`TASKS.md`](./TASKS.md) Phase 순서. 구조 변경 시에도 **타입 → 데이터 → utils → components → app → 보완 → 테스트**.

---

## 4. 코드 스타일

- **들여쓰기 2칸** (탭 금지). Prettier + ESLint + `.editorconfig` — **T-000-3**에서 CI 연동.
- `any` 지양. 불가피 시 `// RULES: any — 사유` 한 줄.
- 도메인 타입: **`src/types/` 선행**, `import type` 사용.
- **UI 문구: 한국어 고정** (내부 도구. 국가 `name`은 데이터 그대로).

---

## 5. Next.js App Router

### 5.1 디렉터리 (정본)

```
app/
    layout.tsx
    page.tsx                 # Server — 정적 데이터 import, Client 섬 조립
    globals.css              # Tailwind v4
src/
    types/
    data/                    # countries.ts, urlRules.ts
    utils/                   # 순수 함수 (lib/ 신설 금지)
    hooks/                   # Client 전용 ('use client' 경계 내에서만 import)
    components/
        layout/ | country/ | environment/ | common/
```

### 5.2 Server / Client

- **Server:** `layout.tsx`, 정적 마크업, `buildEnvironmentUrls` 호출 가능 → `resolvedUrls`를 props로 전달 권장.
- **Client (최소 섬):** `NavigatorClient`, `CopyButton`, 검색·선택 state, `aria-live`, clipboard.
- **`src/hooks/`** 는 Client 컴포넌트에서만 import.

### 5.3 라우팅

MVP: `app/page.tsx` 단일. 추가 라우트는 TASKS 추가 후.

### 5.4 배포

- `next build` 산출물을 **Node 프로세스**로 서빙 (`next start` 또는 플랫폼 동등 방식).
- 환경별 URL은 **빌드 타임 데이터**이므로 설정 변경 시 **재빌드·재배포**한다.

### 5.5 환경 변수·시크릿

- `.env*` **커밋 금지**. MVP는 필수 env 없음. 추가 시 TASKS·RULES 갱신.

---

## 6. 데이터·URL

**상세 템플릿·매핑표:** [`ARCHITECTURE.md`](./ARCHITECTURE.md) §3 (정본).  
아래는 리뷰용 요약.

| 규칙            | 내용                                                                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 하드코딩        | 완성 URL은 `urlRules` + `buildEnvironmentUrls`만. `components`·`hooks`·`app/`에 완성 URL 금지 (테스트 assertion 예외: ARCHITECTURE §3.2) |
| 치환            | Site → `{localeCode}`, Admin → `{countryCode}`                                                                                           |
| PROD UI         | Site(실제), Site(NCMS), Admin — ARCHITECTURE §3.2 매핑                                                                                   |
| `applyTemplate` | 미치환 `{...}` → **throw**                                                                                                               |
| 데이터 입력     | `localeCode`·`countryCode`는 AEM/NCMS와 **동일 표기**, 변환 로직 금지                                                                    |
| 스킴            | 기본 **`https:`**. `http:`는 내부 정책·PR 리뷰 후 `urlRules`에만                                                                         |
| 설정            | 호스트 → `urlRules.ts` / 국가·그룹 → `countries.ts` (`countryGroups` + `Country[]`, `groupId` 필수)                                    |

---

## 7. 컴포넌트·상태·UX

| 레이어                         | `data/` import        |
| ------------------------------ | --------------------- |
| `app/page.tsx`, `*-client.tsx` | 허용                  |
| `src/components/**`            | **금지** (props only) |
| `src/utils/**`                 | 허용                  |

- 컴포넌트 트리·이름: ARCHITECTURE §4.1 **기본**. 변경 시 ARCHITECTURE·TASKS 선행.
- 설정을 React state에 복사하지 않음. UI state: `searchQuery`, `selectedCountryId`.
- **검색:** 검색어 **`trim()`** 후 **300ms debounce** → `searchCountries` (ARCHITECTURE §3.6, TASKS T-009/T-024).
- **선택 유지:** 필터에 선택 국가가 없어도 `selectedCountryId`·`EnvironmentPanel` **유지**. 목록에는 `aria-selected` 유지, 필요 시 패널 상단에 「검색 결과에 없지만 선택 유지 중」 안내 문구(한국어).
- Store: MVP 필수 아님. ARCHITECTURE §5.3 조건 2개 이상 시만 검토. React Query/SWR 금지.
- **레이아웃:** ARCHITECTURE §4.6 — `.gsn-app` 폭·2단 구조만 제한. 타이포·패딩은 T-030 기본값 유지.
- **환경 섹션 순서:** `ENV_DISPLAY_ORDER` = `dev` → `stg` → `prod` (`envOrder.ts` 단일 정본).

---

## 8. 접근성

`role="listbox"`, `aria-selected`, 검색 `label`/`aria-label`, 외부 링크 `rel="noopener noreferrer"`, 복사 `aria-live="polite"`.

---

## 9. 테스트

**러너 (확정):** **Vitest** + React Testing Library + jsdom. Next와 별도 `vitest.config.ts`에서 `@/` path alias를 `tsconfig`와 맞춘다.

| 항목         | 규칙                                                            |
| ------------ | --------------------------------------------------------------- |
| 필수 단위    | `buildEnvironmentUrls`, `searchCountries`, `copyToClipboard`    |
| assertion 예 | `gb` / `uk` 및 `global` / `global` (ARCHITECTURE §3.2 예시 A·B) |
| UI (RTL)     | 검색(debounce 300ms 반영), 선택, PROD 3링크, 복사 mock          |
| MVP 이후     | §2.2 범위 내 회귀 테스트 추가 허용                              |

---

## 10. PR 체크리스트

- [ ] PRD / TASKS / RULES 범위 (또는 §2.2)
- [ ] 기능 변경 시 작업 ID · Cursor 작업 시 [`WORKFLOW.md`](./WORKFLOW.md) 준수
- [ ] URL·타입·레이어·Client 섬·한국어 UI
- [ ] `next build`, lint, `npm test` (T-033 이후)
- [ ] MVP 완료 시 T-039 · TEST_PLAN §12 (해당 시)

---

## 11. 문서 동기화

URL·컴포넌트 계약·스택 변경 시 **관련 문서를 같은 PR에** 포함한다. 코드만 선행 변경 금지.

| 변경               | 문서         |
| ------------------ | ------------ |
| 제품               | PRD          |
| 도메인·URL·UI 구조 | ARCHITECTURE |
| 작업               | TASKS        |
| 스택·규율          | RULES        |
| 에이전트 절차      | WORKFLOW     |
| 수동 QA            | TEST_PLAN    |
