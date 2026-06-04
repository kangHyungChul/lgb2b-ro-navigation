import { describe, expect, it } from "vitest";
import { getGlobalNcmsProbeUrl } from "@/utils/getGlobalNcmsProbeUrl";

describe("getGlobalNcmsProbeUrl", () => {
  it("global prod NCMS URL을 반환한다", () => {
    expect(getGlobalNcmsProbeUrl()).toBe(
      "https://ncms-btb-auth.gp1.aws.lge.com/global/business"
    );
  });
});
