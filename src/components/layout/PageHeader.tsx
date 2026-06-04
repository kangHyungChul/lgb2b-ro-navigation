import { NcmsStatusBadge } from "@/components/layout/NcmsStatusBadge";

/** NCMS 헤더 배지 — 프로브(CSP·망) 이슈로 임시 비노출. true 시 복구 */
const SHOW_NCMS_STATUS_BADGE = false;

export function PageHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
      <h1 className="text-lg font-semibold text-slate-900">
        LG B2B Navigator
      </h1>
      {SHOW_NCMS_STATUS_BADGE ? <NcmsStatusBadge /> : null}
    </header>
  );
}
