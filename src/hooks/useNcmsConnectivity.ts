"use client";

import { useEffect, useState } from "react";
import { checkNcmsReachability } from "@/utils/checkNcmsReachability";
import { getGlobalNcmsProbeUrl } from "@/utils/getGlobalNcmsProbeUrl";

export type NcmsConnectivityStatus = "checking" | "reachable" | "unreachable";

/**
 * 마운트 시 global NCMS(prod) URL 1회 프로브 — 헤더 배지용
 */
export function useNcmsConnectivity(): NcmsConnectivityStatus {
  const [status, setStatus] = useState<NcmsConnectivityStatus>("checking");

  useEffect(() => {
    let cancelled = false;
    const abort = new AbortController();

    async function run() {
      try {
        const url = getGlobalNcmsProbeUrl();
        const result = await checkNcmsReachability(url, {
          signal: abort.signal,
        });
        if (!cancelled) {
          setStatus(result.ok ? "reachable" : "unreachable");
        }
      } catch {
        if (!cancelled) {
          setStatus("unreachable");
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
      abort.abort();
    };
  }, []);

  return status;
}
