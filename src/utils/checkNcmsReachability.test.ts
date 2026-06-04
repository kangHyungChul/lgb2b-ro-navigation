import { afterEach, describe, expect, it, vi } from "vitest";
import { checkNcmsReachability } from "@/utils/checkNcmsReachability";

describe("checkNcmsReachability", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetch 성공 시 ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ type: "opaque" }));

    await expect(
      checkNcmsReachability("https://ncms.example.com/global/business")
    ).resolves.toEqual({ ok: true });
  });

  it("fetch 실패 시 network", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed")));

    await expect(
      checkNcmsReachability("https://ncms.example.com/global/business")
    ).resolves.toEqual({ ok: false, reason: "network" });
  });
});
