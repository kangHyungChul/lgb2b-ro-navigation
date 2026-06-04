import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/PageHeader";

type AppShellProps = {
  sidebar: ReactNode;
  main: ReactNode;
};

/** 뷰포트 높이(100dvh) 안에 고정 — 내부 패널만 개별 스크롤 */
export function AppShell({ sidebar, main }: AppShellProps) {
  return (
    <div className="box-border flex h-dvh flex-col overflow-hidden bg-slate-100 p-4">
      <div className="gsn-app flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
        <PageHeader />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
          <aside className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-b border-slate-200 md:w-[var(--width-gsn-sidebar)] md:flex-none md:border-b-0 md:border-r">
            {sidebar}
          </aside>
          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-4">
            {main}
          </main>
        </div>
      </div>
    </div>
  );
}
