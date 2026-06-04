"use client";

import { useEffect, useMemo, useState } from "react";
import type { Country } from "@/types";
import { searchCountries } from "@/utils/searchCountries";

/** RULES §7 · ARCHITECTURE §3.6 debounce 간격(ms) */
const DEBOUNCE_MS = 300;

/**
 * searchQuery → trim → 300ms debounce → searchCountries
 * trim은 훅 경계에서 1회만(유틸 내부 trim은 동일 문자열에 대해 멱등)
 */
export function useCountrySearch(countries: Country[], searchQuery: string) {
  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);

  const [debouncedQuery, setDebouncedQuery] = useState(trimmedQuery);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(trimmedQuery);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [trimmedQuery]);

  const filteredCountries = useMemo(
    () => searchCountries(countries, debouncedQuery),
    [countries, debouncedQuery]
  );

  return { filteredCountries, debouncedQuery };
}
