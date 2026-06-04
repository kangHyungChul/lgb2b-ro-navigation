"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CountryEmptyState } from "@/components/country/CountryEmptyState";
import { CountryList } from "@/components/country/CountryList";
import { CountrySearchInput } from "@/components/country/CountrySearchInput";
import { EnvironmentPanel } from "@/components/environment/EnvironmentPanel";
import { countries } from "@/data/countries";
import { urlRules } from "@/data/urlRules";
import { useCountrySearch } from "@/hooks/useCountrySearch";
import { useSelectedCountry } from "@/hooks/useSelectedCountry";
import type { ResolvedEnvironmentUrls } from "@/types";
import { buildEnvironmentUrls } from "@/utils/buildEnvironmentUrls";

/** URL 빌드 결과 — throw 시 패널에 한국어 안내 (TC-URL-101) */
function resolveUrlsForCountry(
  country: NonNullable<ReturnType<typeof useSelectedCountry>>
): {
  resolvedUrls: ResolvedEnvironmentUrls | null;
  urlError: string | null;
} {
  try {
    return {
      resolvedUrls: buildEnvironmentUrls(country, urlRules),
      urlError: null,
    };
  } catch {
    return {
      resolvedUrls: null,
      urlError:
        "URL을 생성할 수 없습니다. 국가 코드 또는 URL 규칙을 확인해 주세요.",
    };
  }
}

/**
 * MVP 메인 Client 섬 — 검색·선택·환경 URL 패널 (T-025·T-026)
 */
export function NavigatorClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);

  const { filteredCountries, debouncedQuery } = useCountrySearch(
    countries,
    searchQuery
  );
  const selectedCountry = useSelectedCountry(countries, selectedCountryId);

  const { resolvedUrls, urlError } = useMemo(() => {
    if (!selectedCountry) {
      return { resolvedUrls: null, urlError: null };
    }
    return resolveUrlsForCountry(selectedCountry);
  }, [selectedCountry]);

  const selectedHiddenInFilter =
    selectedCountryId !== null &&
    !filteredCountries.some((c) => c.id === selectedCountryId);

  return (
    <AppShell
      sidebar={
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <CountrySearchInput value={searchQuery} onChange={setSearchQuery} />
          {selectedHiddenInFilter ? (
            <p
              className="shrink-0 px-2 py-1.5 text-xs text-amber-800"
              role="status"
            >
              선택 국가가 검색 결과에 없습니다. URL 패널은 유지됩니다.
            </p>
          ) : null}
          <CountryList
            countries={filteredCountries}
            selectedId={selectedCountryId}
            onSelect={setSelectedCountryId}
            isSearchActive={debouncedQuery.length > 0}
          />
        </div>
      }
      main={
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          {selectedCountry ? (
            <EnvironmentPanel
              country={selectedCountry}
              resolvedUrls={resolvedUrls}
              urlError={urlError}
            />
          ) : (
            <CountryEmptyState />
          )}
        </div>
      }
    />
  );
}
