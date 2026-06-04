import { NcmsStatusBadge } from "@/components/layout/NcmsStatusBadge";

export function PageHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
      <h1 className="text-lg font-semibold text-slate-900">
        LG B2B Navigator
      </h1>
      <NcmsStatusBadge />
    </header>
  );
}
