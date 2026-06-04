# Global Site Navigator — 테스트 계획 (TEST_PLAN)

## 목적

기능 구현 완료 후 **수동·탐색 테스트**로 검증할 시나리오를 정의한다.  
본 문서는 **테스트 시나리오만** 기술하며, 테스트 코드·자동화 스크립트는 포함하지 않는다.

## 기준 문서

| 문서                                   | 용도                                             |
| -------------------------------------- | ------------------------------------------------ |
| [`PRD.md`](./PRD.md)                   | 검증 대상 기능                                   |
| [`RULES.md`](./RULES.md)               | UX(debounce 300ms, 패널 유지, 한국어 UI, 접근성) |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | URL 조합·환경별 링크 구조·MVP 시드 데이터        |
| [`TASKS.md`](./TASKS.md)               | T-039 수동 QA 체크리스트 연계                    |
| [`WORKFLOW.md`](./WORKFLOW.md)         | T-039 L 티어 보고·승인 절차                      |

## 범위

### 포함 (MVP)

- 국가 선택
- 환경별 URL 표시 (**DEV → STG → PROD** 순)
- Site URL (PROD: 실제 + NCMS 2종, STG/DEV: 각 1종)
- Admin URL (환경별 1종)
- URL 클립보드 복사 (표시 축약과 무관하게 **전체 URL**)
- 국가명 검색 (`name`, `nameAliases`)

### 제외

- 즐겨찾기 (PRD 향후, TASKS Phase F)
- 인증·권한·다국어 UI 전환
- 자동화 상세 (RULES §9 / TASKS T-034~038 — 로직은 Vitest, 본 문서 ID와 별개)

### 수동 vs 자동

| 영역                                 | 수동 (본 문서)    | Vitest (TASKS Phase 6) |
| ------------------------------------ | ----------------- | ---------------------- |
| `buildEnvironmentUrls` / placeholder | TC-URL-101, CFG   | T-034~035              |
| debounce 타이밍                      | TC-SRH-201 (체감) | T-036~037              |
| `selectedCountryId` 무효 상태        | — (코드 리뷰)     | T-035 방어             |
| E2E·레이아웃·내부망 접속             | TC-E2E, TC-OPS    | —                      |

---

## 전제 조건

### 공통 환경

- [ ] **`npm run build` 후 `npm run start`**(또는 배포 URL)로 최소 1회 검증 (dev만으로 게이트 통과 불가)
- [ ] `npm run dev`로 개발 중 스모크 가능
- [ ] 브라우저: Chrome 또는 Edge 최신 1종 (복사 이슈 시 Safari 추가 스모크 권장)
- [ ] 클립보드 권한 허용(복사 시나리오)
- [ ] UI 안내·버튼·라벨·오류 메시지는 **한국어** (국가 `name`은 데이터 그대로 — 영어 표기 가능)

### MVP 시드 데이터 (`countries.ts`)

ARCHITECTURE §3.2 **MVP 시드 표**와 동일해야 한다.

| id     | name           | countryCode | localeCode | nameAliases              |
| ------ | -------------- | ----------- | ---------- | ------------------------ |
| global | Global         | global      | global     | Global, 글로벌           |
| gb     | United Kingdom | gb          | uk         | UK, 영국, United Kingdom |

### URL 기대값 — 국가 1건 풀체크 (정본)

수동 QA 시 **아래 표 전체 문자열**을 ARCHITECTURE §3.2 예시 A·B와 대조한다. 개별 TC는 이 표의 부분집합만 검증한다.

#### 예시 A — United Kingdom (`gb` / `uk`)

| 환경 | 링크        | 기대 URL                                                                                 |
| ---- | ----------- | ---------------------------------------------------------------------------------------- |
| PROD | Site (실제) | `https://lg.com/uk/business`                                                             |
| PROD | Site (NCMS) | `https://ncms-btb-auth.gp1.aws.lge.com/uk/business`                                      |
| PROD | Admin       | `https://author-p155411-e1648866.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/gb` |
| STG  | Site        | `https://ncms-btb-auth.gp1stg.aws.lge.com/uk/business`                                   |
| STG  | Admin       | `https://author-p155411-e1648867.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/gb` |
| DEV  | Site        | `https://ncms-btb-auth.gp1dev.aws.lge.com/uk/business`                                   |
| DEV  | Admin       | `https://author-p155411-e1648827.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/gb` |

#### 예시 B — Global (`global` / `global`)

| 환경 | 링크        | 기대 URL                                                                                     |
| ---- | ----------- | -------------------------------------------------------------------------------------------- |
| PROD | Site (실제) | `https://lg.com/global/business`                                                             |
| PROD | Site (NCMS) | `https://ncms-btb-auth.gp1.aws.lge.com/global/business`                                      |
| PROD | Admin       | `https://author-p155411-e1648866.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/global` |
| STG  | Site        | `https://ncms-btb-auth.gp1stg.aws.lge.com/global/business`                                   |
| STG  | Admin       | `https://author-p155411-e1648867.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/global` |
| DEV  | Site        | `https://ncms-btb-auth.gp1dev.aws.lge.com/global/business`                                   |
| DEV  | Admin       | `https://author-p155411-e1648827.adobeaemcloud.com/ui#/aem/sites.html/content/lgebtb/global` |

### 운영·환경 참고 (TC-OPS)

| ID         | 시나리오                  | 절차                                              | 기대 결과                                                                            |
| ---------- | ------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| TC-OPS-001 | [운영] 내부 호스트 접속   | QA 네트워크에서 NCMS·AEM 링크 새 탭·표시 URL 확인 | **표시 URL 정확** + 새 탭 동작 Pass. 실제 페이지 로드는 QA망에서 확인(**필수 Pass**) |
| TC-OPS-002 | [운영] 데이터만 변경 배포 | `countries.ts` 수정 후 **재빌드·재배포**          | 반영된 URL 표시. 재빌드 없이 배포 시 **구 URL** — Fail (**필수 Pass**)               |
| TC-OPS-003 | [운영] 표시 vs 복사       | LinkRow URL이 화면에서 잘려 보일 때               | 복사·`href`는 **풀 URL** (TC-CPY-001과 동일 기준)                                    |

---

## 시나리오 ID 규칙

| 접두사     | 의미                       |
| ---------- | -------------------------- |
| `TC-SEL-`  | 국가 선택                  |
| `TC-URL-`  | 환경별 URL 표시            |
| `TC-SITE-` | Site URL                   |
| `TC-ADM-`  | Admin URL                  |
| `TC-CPY-`  | URL 복사                   |
| `TC-SRH-`  | 검색                       |
| `TC-ACC-`  | 접근성·레이아웃            |
| `TC-E2E-`  | 통합 흐름                  |
| `TC-OPS-`  | 운영·배포·네트워크         |
| `TC-CFG-`  | 검증 빌드 결함 인덱스 (§9) |

| 유형 태그 | 의미                       |
| --------- | -------------------------- |
| `[정상]`  | 기대 동작                  |
| `[예외]`  | 오류·빈 상태·설정 결함     |
| `[경계]`  | 최소/최대·타이밍·특수 입력 |
| `[운영]`  | 인프라·데이터·배포         |

---

## 1. 국가 선택

### 1.1 정상

| ID         | 시나리오         | 절차                        | 기대 결과                                                               |
| ---------- | ---------------- | --------------------------- | ----------------------------------------------------------------------- |
| TC-SEL-001 | [정상] 초기 화면 | 앱 최초 로드                | 우측 **미선택 안내**(한국어). 환경 URL 패널 **미표시**                  |
| TC-SEL-002 | [정상] 국가 선택 | `United Kingdom` 클릭       | 선택 스타일 + `aria-selected`, 우측 **EnvironmentPanel**, 헤더에 국가명 |
| TC-SEL-003 | [정상] 국가 변경 | `United Kingdom` → `Global` | 선택·URL이 **global / global** 기준으로 갱신                            |
| TC-SEL-005 | [정상] 한국어 UI | 버튼·빈 상태·오류 문구 확인 | 안내·복사 피드백 등 **한국어** (`name`은 영어 가능)                     |

### 1.2 예외 · 경계

| ID         | 시나리오              | 절차                    | 기대 결과                                             |
| ---------- | --------------------- | ----------------------- | ----------------------------------------------------- |
| TC-SEL-101 | [예외] 미선택         | 로드 후 클릭 없음       | **CountryEmptyState**. Site/Admin·복사 **없음**       |
| TC-SEL-102 | [예외] countries `[]` | 검증 빌드               | 목록 빈 안내, 선택 불가, 우측 미선택, **크래시 없음** |
| TC-SEL-201 | [경계] 1건만          | countries 1건 검증 빌드 | 유일 항목 선택 정상                                   |

---

## 2. 환경별 URL 표시

### 2.1 정상

| ID         | 시나리오              | 절차            | 기대 결과                                                       |
| ---------- | --------------------- | --------------- | --------------------------------------------------------------- |
| TC-URL-001 | [정상] 환경 순서·섹션 | `gb` 선택       | **DEV → STG → PROD** 순, Badge로 구분                           |
| TC-URL-002 | [정상] 링크 수        | `gb` 선택       | PROD **3개**, STG/DEV 각 **2개**                                |
| TC-URL-003 | [정상] 메타 표시      | `gb` 선택       | `countryCode` **gb**, `localeCode` **uk** 표시                  |
| TC-URL-004 | [정상] 국가 변경      | `gb` → `global` | 상단 **예시 B 표**·ARCHITECTURE §3.2 예시 B URL로 **일괄** 변경 |
| TC-URL-005 | [정상] 풀체크 A       | `gb` 선택       | 상단 **예시 A 표** 7 URL **전건 일치**                          |
| TC-URL-006 | [정상] 풀체크 B       | `global` 선택   | 상단 **예시 B 표** 7 URL **전건 일치**                          |
| TC-URL-007 | [정상] Badge 구분     | 3환경 표시      | PROD/STG/DEV **시각 구분** 가능 (색·텍스트)                     |

### 2.2 예외 · 경계

| ID         | 시나리오                  | 절차                     | 기대 결과                                                                                                          |
| ---------- | ------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| TC-URL-101 | [예외] placeholder 잔留   | 검증 빌드 `{unknown}` 등 | `applyTemplate` **throw** 후 UI catch — **크래시 없음**, 잘못된 URL·빈 `href` **금지**, 한국어 오류 또는 행 미표시 |
| TC-URL-201 | [경계] Site vs Admin 토큰 | `gb` vs `global` 비교    | Site는 `localeCode`, Admin은 `countryCode`만 반영                                                                  |

---

## 3. Site URL

### 3.1 정상

| ID          | 시나리오                | 절차               | 기대 결과                                             |
| ----------- | ----------------------- | ------------------ | ----------------------------------------------------- |
| TC-SITE-001 | [정상] PROD Site (실제) | `gb` → PROD        | `https://lg.com/uk/business`                          |
| TC-SITE-002 | [정상] PROD Site (NCMS) | `gb` → PROD        | `https://ncms-btb-auth.gp1.aws.lge.com/uk/business`   |
| TC-SITE-003 | [정상] STG/DEV Site     | `gb` → STG·DEV     | 예시 A STG/DEV Site URL                               |
| TC-SITE-004 | [정상] 외부 링크 공통   | Site 링크 **전건** | `target="_blank"`, `rel="noopener noreferrer"`, 새 탭 |

### 3.2 예외 · 경계

| ID          | 시나리오                   | 절차                                       | 기대 결과                                                  |
| ----------- | -------------------------- | ------------------------------------------ | ---------------------------------------------------------- |
| TC-SITE-101 | [예외] Site 템플릿 누락    | `actual.site` 또는 `site.stg` 빈 검증 빌드 | 해당 Site 행 미표시 또는 「URL 없음」. Admin **분리** 확인 |
| TC-SITE-102 | [예외] `site.prod`만 빈 값 | NCMS PROD만 빈 검증 빌드                   | Site(실제) 정상, Site(NCMS)만 미표시/안내                  |
| TC-SITE-103 | [예외] localeCode 빈 값    | 검증 빌드                                  | 빈 `href` **금지**, 오류 처리 일관                         |
| TC-SITE-201 | [경계] localeCode 그대로   | `gb` (`uk`)                                | 경로에 **`uk`** 그대로 (대소문자 변환 없음)                |

---

## 4. Admin URL

### 4.1 정상

| ID         | 시나리오             | 절차           | 기대 결과                            |
| ---------- | -------------------- | -------------- | ------------------------------------ |
| TC-ADM-001 | [정상] PROD Admin    | `gb` → PROD    | 예시 A PROD Admin, **`#/aem/`** 포함 |
| TC-ADM-002 | [정상] STG/DEV Admin | `gb`           | 예시 A STG/DEV Admin                 |
| TC-ADM-003 | [정상] 외부 링크     | Admin **전건** | 새 탭 + `rel`, hash 유지             |

### 4.2 예외 · 경계

| ID         | 시나리오                 | 절차                         | 기대 결과                                      |
| ---------- | ------------------------ | ---------------------------- | ---------------------------------------------- |
| TC-ADM-101 | [예외] Admin 템플릿 누락 | `admin.prod` 등 빈 검증 빌드 | 해당 Admin 행만 미표시/안내                    |
| TC-ADM-102 | [예외] countryCode 빈 값 | 검증 빌드                    | `.../lgebtb/` 오류 노출 최소화, 빈 `href` 금지 |

---

## 5. URL 복사

### 5.1 정상

| ID         | 시나리오                 | 절차                  | 기대 결과                                                          |
| ---------- | ------------------------ | --------------------- | ------------------------------------------------------------------ |
| TC-CPY-001 | [정상] PROD Site 복사    | `gb` → Site (실제)    | 클립보드 = `https://lg.com/uk/business` (**표시 축약과 무관**)     |
| TC-CPY-002 | [정상] PROD Admin 복사   | `gb` → PROD Admin     | **hash 포함** 전체 URL                                             |
| TC-CPY-006 | [정상] Global Admin 복사 | `global` → PROD Admin | 예시 B PROD Admin URL **hash 포함** 전체 복사                      |
| TC-CPY-003 | [정상] STG/DEV 복사      | STG Site, DEV Admin   | 표시(또는 `href`)와 클립보드 **일치**                              |
| TC-CPY-004 | [정상] 피드백            | 복사 클릭             | 한국어 「복사됨」 등 + `aria-live="polite"` (스크린리더 인지 가능) |
| TC-CPY-005 | [정상] 연속 복사         | 서로 다른 링크 3회    | 마지막 URL만 반영, 피드백 꼬임 없음                                |

### 5.2 예외 · 경계

| ID         | 시나리오             | 절차                 | 기대 결과                                      |
| ---------- | -------------------- | -------------------- | ---------------------------------------------- |
| TC-CPY-101 | [예외] 클립보드 거부 | 권한 차단 후 복사    | **한국어** 오류, 크래시 없음                   |
| TC-CPY-102 | [예외] URL 없음 행   | TC-SITE/ADM-101 상태 | 복사 비활성 또는 안내, **빈 문자열 복사 금지** |

---

## 6. 검색 기능

### 6.1 정상

| ID         | 시나리오             | 절차                      | 기대 결과                                                                 |
| ---------- | -------------------- | ------------------------- | ------------------------------------------------------------------------- |
| TC-SRH-001 | [정상] name 검색     | `United` 입력             | **300ms 후** United Kingdom                                               |
| TC-SRH-002 | [정상] 대소문자 무시 | `global`, `GLOBAL`        | 동일 결과                                                                 |
| TC-SRH-003 | [정상] alias         | `영국`, `UK`, `글로벌`    | 해당 국가 표시                                                            |
| TC-SRH-004 | [정상] 검색어 삭제   | 전체 삭제                 | **300ms 후** 2건 모두 복원                                                |
| TC-SRH-005 | [정상] 선택 유지     | `gb` 선택 → `zzz`         | 목록에 gb 없음, 패널은 **gb URL 유지**. 안내 문구는 **권장**(없어도 Pass) |
| TC-SRH-006 | [정상] 필터 후 선택  | `영` 검색 → `Global` 클릭 | global URL로 갱신                                                         |
| TC-SRH-007 | [정상] 미선택 + 검색 | 선택 전 `Global` 검색     | Global만 표시, 패널 미선택                                                |
| TC-SRH-008 | [정상] 붙여넣기      | `United Kingdom` 붙여넣기 | 300ms 후 필터 반영                                                        |

### 6.2 예외 · 경계

| ID         | 시나리오              | 절차             | 기대 결과                                                                          |
| ---------- | --------------------- | ---------------- | ---------------------------------------------------------------------------------- |
| TC-SRH-101 | [예외] 결과 없음      | `xyz123`         | 300ms 후 한국어 안내, 0건, 크래시 없음                                             |
| TC-SRH-102 | [예외] 공백만         | 스페이스만       | **trim 후 빈 문자열 → 전체 목록** (ARCHITECTURE §3.6)                              |
| TC-SRH-103 | [예외] 공백 trim      | `UK` 입력        | trim 후 `UK` 매칭 → United Kingdom                                                 |
| TC-SRH-104 | [예외] countries `[]` | 검증 빌드 + 검색 | 결과 없음, TC-SEL-102와 **1회** 수행                                               |
| TC-SRH-201 | [경계] debounce       | `Glob` 빠른 입력 | 300ms 정지 후 최종 결과만 반영; 입력 중 **이전 필터 유지·목록 깜빡임 허용 = Pass** |
| TC-SRH-202 | [경계] 1글자          | `G`              | **Global·United Kingdom** 등 `G` 부분 일치 **0~2건** (둘 다면 Pass)                |

---

## 7. 통합·레이아웃 (E2E)

| ID         | 시나리오            | 절차                                                        | 기대 결과                                                                 |
| ---------- | ------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| TC-E2E-001 | [정상] 전체 플로우  | 로드 → `영국` 검색 → UK 선택 → PROD Site 새 탭 → Admin 복사 | 단계별 Pass, 상태 꼬임 없음                                               |
| TC-E2E-002 | [정상] 데스크톱 2단 | 너비 ≥ 768px                                                | 좌 목록·우 패널 **가로 분리**                                             |
| TC-E2E-003 | [정상] 모바일       | 너비 &lt; 768px                                             | **세로 스택**, 가로 스크롤 없이 동일 기능                                 |
| TC-E2E-004 | [정상] 새로고침     | `gb` 선택 후 F5                                             | 선택·검색어 **초기화**(MVP URL 동기화 없음) — **N/A 아님**, 초기화가 기대 |

---

## 8. 접근성·보조

| ID         | 시나리오              | 절차             | 기대 결과                      |
| ---------- | --------------------- | ---------------- | ------------------------------ |
| TC-ACC-001 | [정상] listbox 키보드 | 화살표·Enter     | 옵션 이동·선택, 포커스 visible |
| TC-ACC-002 | [정상] 복사 키보드    | Tab → 복사 Enter | 복사 동작                      |
| TC-ACC-003 | [정상] 검색 라벨      | 스크린리더       | accessible name                |

---

## 9. 설정 결함 — 검증 빌드 인덱스

**운영 `countries.ts` / `urlRules.ts`에는 적용하지 않는다.**  
아래는 **연결된 TC 1회만** 실행한다(인덱스 중복 실행 금지).

| ID         | 결함                              | 실행 TC                 |
| ---------- | --------------------------------- | ----------------------- |
| TC-CFG-001 | `countries.ts` `[]`               | TC-SEL-102, TC-SRH-104  |
| TC-CFG-002 | `actual.site` 빈 문자열           | TC-SITE-101             |
| TC-CFG-003 | `site.prod`만 빈 문자열           | TC-SITE-102             |
| TC-CFG-004 | `admin.prod` 빈 문자열            | TC-ADM-101              |
| TC-CFG-005 | `localeCode` / `countryCode` `""` | TC-SITE-103, TC-ADM-102 |
| TC-CFG-006 | `{unknown}` placeholder           | TC-URL-101              |

---

## 10. PRD 추적 매트릭스

| PRD 기능                | 관련 시나리오 ID                            |
| ----------------------- | ------------------------------------------- |
| 국가 선택               | TC-SEL-001~003, 005, 101~102, 201           |
| 환경 정보 조회          | TC-URL-001~007, 101, 201                    |
| Site URL                | TC-SITE-001~004, 101~103, 201 + URL-005/006 |
| Admin URL               | TC-ADM-001~003, 101~102 + URL-005/006       |
| 링크 복사               | TC-CPY-001~006, 101~102, TC-OPS-003         |
| 국가명 검색             | TC-SRH-001~008, 101~104, 201~202            |
| 국가 없음               | TC-SEL-101, 102                             |
| URL 없음                | TC-URL-101, TC-SITE-101~103, TC-CFG-002~003 |
| Admin URL 없음          | TC-ADM-101, TC-CFG-004                      |
| 검색 결과 없음          | TC-SRH-101, TC-SRH-005                      |
| 운영·배포 (게이트 필수) | TC-OPS-001~003                              |

---

## 11. 실행·결과 기록

### 11.1 실행 정보 (템플릿)

| 항목                                   | 값  |
| -------------------------------------- | --- |
| 빌드/커밋                              |     |
| 실행자                                 |     |
| 실행일                                 |     |
| 브라우저                               |     |
| 환경 (local `next start` / stg / prod) |     |

### 11.2 결과 요약 (템플릿)

| 결과    | 건수 |
| ------- | ---- |
| Pass    |      |
| Fail    |      |
| Blocked |      |
| N/A     |      |

### 11.3 결함 기록 (템플릿)

| 시나리오 ID | 결과                  | 결함 요약 | 심각도                   | 이슈 링크 |
| ----------- | --------------------- | --------- | ------------------------ | --------- |
|             | Pass / Fail / Blocked |           | Critical / Major / Minor |           |

---

## 12. 완료 기준 (MVP QA 게이트 — T-039)

### 12.1 [정상] 시나리오 — 100% Pass 대상

아래 ID **전건** Pass. (스모크 시 TC-URL-005·006만으로 URL 검증을 대체할 수 있으나, 게이트 통과에는 **005·006 필수**.)

`TC-SEL-001, 002, 003, 005` · `TC-URL-001`~`007` · `TC-SITE-001`~`004` · `TC-ADM-001`~`003` · `TC-CPY-001`~`006` · `TC-SRH-001`~`008, 201, 202` · `TC-E2E-001`~`004` · `TC-ACC-001`~`003`

### 12.2 필수 Pass (정상 외)

- [ ] **`npm run build` + `npm run start`** 환경에서 TC-URL-005·006(풀체크)
- [ ] **요청 예외 4종:** TC-SEL-101, TC-SITE-101, TC-ADM-101, TC-SRH-101
- [ ] **§9 검증 빌드**(TC-CFG-001~006 연결 TC): 크래시·빈 `href`·무음 실패 없음. placeholder(TC-URL-101) 포함
- [ ] **운영:** TC-OPS-001, 002, 003 **필수 Pass**
- [ ] `gb`/`uk`·`global`/`global` URL = ARCHITECTURE §3.2 예시 A·B **전건 일치**
- [ ] PROD Admin 복사 **hash 포함** (TC-CPY-002, TC-CPY-006)

---

## 13. 참고

- 자동화: RULES §9, TASKS T-034~038 — `gb`/`uk`, `global` assertion
- 문서 변경 시 **TEST_PLAN · ARCHITECTURE · TASKS(T-005, T-007, T-009, T-016, T-035) · WORKFLOW** 동시 갱신
- 데이터 품질(중복 `id`, 잘못된 code)은 T-006·운영 PR 리뷰; 필요 시 TC 추가
