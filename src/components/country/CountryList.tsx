"use client";

import { useCallback, useMemo, useRef } from "react";
import { CountryListItem } from "@/components/country/CountryListItem";
import { countryGroups } from "@/data/countries";
import { useCountryGroupExpand } from "@/hooks/useCountryGroupExpand";
import type { Country } from "@/types";
import { groupCountries } from "@/utils/groupCountries";

type CountryListProps = {
  countries: Country[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** debounce 반영 후 검색어가 있으면 true — 접힌 그룹도 결과 노출을 위해 일시 펼침 */
  isSearchActive?: boolean;
};

/** 그룹 헤더(접기/펼치기) + 국가 listbox — 펼친 그룹만 키보드 탐색에 포함 */
export function CountryList({
  countries,
  selectedId,
  onSelect,
  isSearchActive = false,
}: CountryListProps) {
  const { isGroupExpanded, toggleGroupExpanded } =
    useCountryGroupExpand(countryGroups);

  /** 검색 중에는 쿠키·접힘 상태와 무관하게 매칭 그룹을 펼쳐 표시 */
  const isSectionExpanded = useCallback(
    (groupId: string) => isSearchActive || isGroupExpanded(groupId),
    [isSearchActive, isGroupExpanded]
  );

  const sections = useMemo(
    () => groupCountries(countryGroups, countries),
    [countries]
  );

  const flatCountries = useMemo(
    () =>
      sections.flatMap((section) =>
        isSectionExpanded(section.group.id) ? section.countries : []
      ),
    [sections, isSectionExpanded]
  );

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusIndex = useCallback((index: number) => {
    itemRefs.current[index]?.focus();
  }, []);

  const handleListKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (flatCountries.length === 0) return;

      const currentIndex = flatCountries.findIndex((c) => c.id === selectedId);
      let nextIndex = currentIndex >= 0 ? currentIndex : 0;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = Math.min(nextIndex + 1, flatCountries.length - 1);
        onSelect(flatCountries[nextIndex].id);
        focusIndex(nextIndex);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = Math.max(nextIndex - 1, 0);
        onSelect(flatCountries[nextIndex].id);
        focusIndex(nextIndex);
      } else if (event.key === "Home") {
        event.preventDefault();
        onSelect(flatCountries[0].id);
        focusIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        const last = flatCountries.length - 1;
        onSelect(flatCountries[last].id);
        focusIndex(last);
      }
    },
    [flatCountries, selectedId, onSelect, focusIndex]
  );

  if (sections.length === 0) {
    return (
      <p
        className="flex min-h-0 flex-1 items-center justify-center px-3 py-6 text-center text-sm text-slate-500"
        role="status"
        aria-live="polite"
      >
        검색 결과가 없습니다.
      </p>
    );
  }

  let flatIndex = 0;

  return (
    <div
      role="listbox"
      aria-label="국가 목록"
      tabIndex={0}
      onKeyDown={handleListKeyDown}
      className="min-h-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden px-2 py-2 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
    >
      {sections.map(({ group, countries: groupItems }) => {
        const expanded = isSectionExpanded(group.id);
        const panelId = `country-group-panel-${group.id}`;

        return (
          <div
            key={group.id}
            className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50/60 shadow-sm"
          >
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => toggleGroupExpanded(group.id)}
              className="flex w-full items-center gap-2 border-b border-slate-200 bg-slate-100 px-3 py-2 text-left text-xs font-semibold tracking-wide text-slate-700 transition-colors hover:bg-slate-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500"
            >
              <span
                aria-hidden
                className={`inline-flex size-4 shrink-0 items-center justify-center text-slate-500 transition-transform ${
                  expanded ? "rotate-0" : "-rotate-90"
                }`}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-3"
                >
                  <path d="M4.5 6.5 8 10l3.5-3.5L12 8.5 8 12.5 4 8.5z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">{group.label}</span>
              <span className="shrink-0 font-normal text-slate-500">
                {groupItems.length}
              </span>
            </button>
            {expanded ? (
              <div id={panelId} className="space-y-0.5 px-1 py-1.5">
                {groupItems.map((country) => {
                  const index = flatIndex++;
                  return (
                    <CountryListItem
                      key={country.id}
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      country={country}
                      isSelected={selectedId === country.id}
                      onSelect={onSelect}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
