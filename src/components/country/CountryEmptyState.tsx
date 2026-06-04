/** 국가 미선택 안내 — 본문 영역 중앙 */
export function CountryEmptyState() {
  return (
    <div className="flex h-full min-h-0 flex-1 items-center justify-center">
      <p className="text-center text-sm text-slate-500">
        왼쪽에서 국가를 선택하세요.
      </p>
    </div>
  );
}
