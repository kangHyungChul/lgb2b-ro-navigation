import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { countries } from "@/data/countries";
import { useCountrySearch } from "@/hooks/useCountrySearch";

describe("useCountrySearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounce 300ms 후 필터 반영", () => {
    const { result, rerender } = renderHook(
      ({ q }: { q: string }) => useCountrySearch(countries, q),
      { initialProps: { q: "" } }
    );

    expect(result.current.filteredCountries).toHaveLength(22);

    rerender({ q: "UK" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filteredCountries).toHaveLength(1);
    expect(result.current.filteredCountries[0].id).toBe("gb");
  });

  it("trim 후 빈 검색어 → 전체", () => {
    const { result } = renderHook(() =>
      useCountrySearch(countries, "   ")
    );

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filteredCountries).toHaveLength(22);
  });
});
