import { describe, expect, it, beforeEach } from "vitest";
import type { CountryGroup } from "@/types";
import {
  buildDefaultExpandedMap,
  COUNTRY_GROUP_EXPAND_COOKIE_NAME,
  mergeExpandedMapWithGroups,
  readCountryGroupExpandCookie,
  writeCountryGroupExpandCookie,
} from "@/utils/countryGroupExpandCookie";

const sampleGroups: CountryGroup[] = [
  { id: "group1", label: "GROUP1", defaultExpanded: true },
  { id: "group2", label: "GROUP2", defaultExpanded: false },
];

describe("countryGroupExpandCookie", () => {
  beforeEach(() => {
    document.cookie = `${COUNTRY_GROUP_EXPAND_COOKIE_NAME}=; Max-Age=0; Path=/`;
  });

  it("buildDefaultExpandedMap은 defaultExpanded를 반영한다", () => {
    expect(buildDefaultExpandedMap(sampleGroups)).toEqual({
      group1: true,
      group2: false,
    });
  });

  it("defaultExpanded 생략 시 true", () => {
    const groups: CountryGroup[] = [{ id: "g", label: "G" }];
    expect(buildDefaultExpandedMap(groups)).toEqual({ g: true });
  });

  it("mergeExpandedMapWithGroups는 쿠키 값을 우선한다", () => {
    expect(
      mergeExpandedMapWithGroups(sampleGroups, { group1: false, group2: true })
    ).toEqual({ group1: false, group2: true });
  });

  it("쿠키에 없는 그룹 id는 defaultExpanded를 쓴다", () => {
    expect(mergeExpandedMapWithGroups(sampleGroups, { group1: false })).toEqual({
      group1: false,
      group2: false,
    });
  });

  it("read/write 라운드트립", () => {
    writeCountryGroupExpandCookie({ group1: false, group2: true });
    expect(readCountryGroupExpandCookie(document.cookie)).toEqual({
      group1: false,
      group2: true,
    });
  });
});
