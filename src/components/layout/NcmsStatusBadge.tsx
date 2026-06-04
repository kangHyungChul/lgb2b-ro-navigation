"use client";

import { useNcmsConnectivity } from "@/hooks/useNcmsConnectivity";

/** 헤더 우측 — global NCMS 접속 가능 여부 */
export function NcmsStatusBadge() {
  const status = useNcmsConnectivity();

  if (status === "checking") {
    return (
      <span
        className="inline-flex max-w-[14rem] shrink-0 items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
        role="status"
        aria-live="polite"
      >
        NCMS 확인 중…
      </span>
    );
  }

  if (status === "reachable") {
    return (
      <span
        className="inline-flex max-w-[14rem] shrink-0 items-center rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200"
        role="status"
        aria-live="polite"
      >
        NCMS 접속가능
      </span>
    );
  }

  return (
    <span
      className="inline-flex max-w-[min(100%,20rem)] shrink-0 items-center rounded-md bg-rose-100 px-2 py-0.5 text-xs font-semibold leading-snug text-rose-800 ring-1 ring-inset ring-rose-200"
      role="status"
      aria-live="polite"
    >
      NCMS 접속불가능, 클라우드 환경인지 확인하세요
    </span>
  );
}
