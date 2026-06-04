import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { countryGroups } from "@/data/countries";
import { useCountryGroupExpand } from "@/hooks/useCountryGroupExpand";
import {
  COUNTRY_GROUP_EXPAND_COOKIE_NAME,
  writeCountryGroupExpandCookie,
} from "@/utils/countryGroupExpandCookie";

describe("useCountryGroupExpand", () => {
  beforeEach(() => {
    document.cookie = `${COUNTRY_GROUP_EXPAND_COOKIE_NAME}=; Max-Age=0; Path=/`;
  });

  it("쿠키 없음 → countries.ts 기본값", async () => {
    const { result } = renderHook(() => useCountryGroupExpand(countryGroups));

    expect(result.current.isGroupExpanded("group1")).toBe(true);
    expect(result.current.isGroupExpanded("opened")).toBe(false);
    expect(result.current.isGroupExpanded("group2")).toBe(true);
  });

  it("쿠키 있음 → 마운트 후 쿠키 값 적용", async () => {
    writeCountryGroupExpandCookie({ group1: false, group2: true });

    const { result } = renderHook(() => useCountryGroupExpand(countryGroups));

    await waitFor(() => {
      expect(result.current.isGroupExpanded("group1")).toBe(false);
      expect(result.current.isGroupExpanded("group2")).toBe(true);
    });
  });

  it("toggleGroupExpanded → 상태·쿠키 갱신", async () => {
    const { result } = renderHook(() => useCountryGroupExpand(countryGroups));

    act(() => {
      result.current.toggleGroupExpanded("group2");
    });

    expect(result.current.isGroupExpanded("group2")).toBe(false);

    await waitFor(() => {
      expect(document.cookie).toContain(COUNTRY_GROUP_EXPAND_COOKIE_NAME);
    });
  });
});
