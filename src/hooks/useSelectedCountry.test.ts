import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { countries } from "@/data/countries";
import { useSelectedCountry } from "@/hooks/useSelectedCountry";

describe("useSelectedCountry", () => {
  it("null id → null", () => {
    const { result } = renderHook(() =>
      useSelectedCountry(countries, null)
    );
    expect(result.current).toBeNull();
  });

  it("유효 id → Country", () => {
    const { result } = renderHook(() =>
      useSelectedCountry(countries, "gb")
    );
    expect(result.current?.name).toBe("United Kingdom");
  });

  it("없는 id → null", () => {
    const { result } = renderHook(() =>
      useSelectedCountry(countries, "xx")
    );
    expect(result.current).toBeNull();
  });
});
