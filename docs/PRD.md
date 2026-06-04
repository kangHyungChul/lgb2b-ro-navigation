# Global Site Navigator

구현·코딩 규칙: [`RULES.md`](./RULES.md) · 작업 목록: [`TASKS.md`](./TASKS.md) · 설계: [`ARCHITECTURE.md`](./ARCHITECTURE.md) · 테스트: [`TEST_PLAN.md`](./TEST_PLAN.md) · **Cursor 절차:** [`WORKFLOW.md`](./WORKFLOW.md)

## 목적

각 국가별 사이트 및 관리자 페이지를
한 화면에서 빠르게 접근할 수 있도록 제공한다.

## 사용자

- 개발자
- QA
- 운영자
- PM

## 주요 기능

### 국가 선택

사용자는 국가를 선택할 수 있다. 목록은 **운영 그룹**(예: 기오픈 국가, 1그룹) 헤더로 구분한다. 검색 시 해당 그룹에 결과가 없으면 그룹은 숨긴다.

### 환경 정보 조회

선택된 국가에 대해 다음 환경 링크를 제공한다. 화면 노출 순서는 **DEV → STG → PROD** 이다 (URL 규칙·데이터 구조와 무관).

- DEV URL
- STG URL
- PROD URL

### 환경별 링크

각 환경에 대해 다음 링크를 제공한다.

- Site URL (PROD는 **실제 Site** + **NCMS Site** 2종, STG/DEV는 Site 1종; UI 라벨: Site / NCMS / **AEM**)
- Admin URL (AEM Author — UI에서는 **AEM** 라벨)

### 링크 복사

URL을 클립보드에 복사할 수 있다.

### 검색 기능

국가명을 검색할 수 있다.

## 비기능·운영 (요약)

상세는 [`ARCHITECTURE.md`](./ARCHITECTURE.md) §6(성능·배포·설정 변경), [`RULES.md`](./RULES.md) §5.4(재빌드), [`TEST_PLAN.md`](./TEST_PLAN.md) TC-OPS를 참고한다.

## 향후 기능

### 즐겨찾기

자주 사용하는 국가를 즐겨찾기 등록할 수 있다.
