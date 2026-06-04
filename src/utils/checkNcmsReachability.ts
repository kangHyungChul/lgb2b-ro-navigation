const DEFAULT_TIMEOUT_MS = 10_000;

export type NcmsReachabilityResult =
  | { ok: true }
  | { ok: false; reason: "timeout" | "network" | "aborted" };

/**
 * 브라우저에서 NCMS URL 네트워크 도달 여부를 본다.
 * CORS로 본문은 읽지 못해도(no-cors) 응답이 오면 접속 가능으로 간주한다.
 */
export async function checkNcmsReachability(
  url: string,
  options?: { timeoutMs?: number; signal?: AbortSignal }
): Promise<NcmsReachabilityResult> {
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  const onParentAbort = () => controller.abort();
  options?.signal?.addEventListener("abort", onParentAbort);

  try {
    await fetch(url, {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
      credentials: "omit",
      signal: controller.signal,
    });
    return { ok: true };
  } catch {
    if (controller.signal.aborted) {
      const reason =
        options?.signal?.aborted === true ? "aborted" : "timeout";
      return { ok: false, reason };
    }
    return { ok: false, reason: "network" };
  } finally {
    window.clearTimeout(timeoutId);
    options?.signal?.removeEventListener("abort", onParentAbort);
  }
}
