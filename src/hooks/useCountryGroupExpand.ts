"use client";

import { useCallback, useEffect, useState } from "react";
import type { CountryGroup } from "@/types";
import {
  buildDefaultExpandedMap,
  mergeExpandedMapWithGroups,
  readCountryGroupExpandCookie,
  writeCountryGroupExpandCookie,
} from "@/utils/countryGroupExpandCookie";

/**
 * 국가 목록 그룹 접기/펼치기 상태.
 * - 초기 렌더: countries.ts defaultExpanded
 * - 마운트 후: 쿠키가 있으면 병합 적용
 * - 토글 시: 상태 + 쿠키 동시 갱신
 */
export function useCountryGroupExpand(groups: CountryGroup[]) {
  const [expandedByGroupId, setExpandedByGroupId] = useState(() =>
    buildDefaultExpandedMap(groups)
  );

  useEffect(() => {
    const fromCookie = readCountryGroupExpandCookie();
    setExpandedByGroupId(mergeExpandedMapWithGroups(groups, fromCookie));
  }, [groups]);

  const isGroupExpanded = useCallback(
    (groupId: string) => expandedByGroupId[groupId] ?? true,
    [expandedByGroupId]
  );

  const toggleGroupExpanded = useCallback((groupId: string) => {
    setExpandedByGroupId((prev) => {
      const next = {
        ...prev,
        [groupId]: !(prev[groupId] ?? true),
      };
      writeCountryGroupExpandCookie(next);
      return next;
    });
  }, []);

  return { isGroupExpanded, toggleGroupExpanded };
}
