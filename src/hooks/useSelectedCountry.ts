"use client";

import { useMemo } from "react";
import type { Country } from "@/types";

/**
 * selectedCountryId → Country | null (전체 countries 기준, 필터 목록과 무관)
 */
export function useSelectedCountry(
  countries: Country[],
  selectedCountryId: string | null
): Country | null {
  return useMemo(() => {
    if (selectedCountryId === null) {
      return null;
    }
    return countries.find((c) => c.id === selectedCountryId) ?? null;
  }, [countries, selectedCountryId]);
}
