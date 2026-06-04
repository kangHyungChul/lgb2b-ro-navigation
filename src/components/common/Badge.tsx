import type { EnvironmentKind } from "@/types";

/** 환경 kind → UI 라벨 (ARCHITECTURE §4, TEST_PLAN TC-URL-007) */
const KIND_LABEL: Record<EnvironmentKind, string> = {
  prod: "PROD",
  stg: "STG",
  dev: "DEV",
};

/** kind별 Tailwind 배지 색 — 세 환경 시각 구분 */
const KIND_CLASS: Record<EnvironmentKind, string> = {
  prod: "bg-rose-100 text-rose-800 ring-rose-200",
  stg: "bg-amber-100 text-amber-900 ring-amber-200",
  dev: "bg-sky-100 text-sky-900 ring-sky-200",
};

type BadgeProps = {
  kind: EnvironmentKind;
};

/** PROD / STG / DEV 환경 라벨 배지 */
export function Badge({ kind }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${KIND_CLASS[kind]}`}
    >
      {KIND_LABEL[kind]}
    </span>
  );
}
