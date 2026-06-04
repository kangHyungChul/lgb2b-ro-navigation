import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockClipboard } from "@/test/mockClipboard";
import { copyToClipboard } from "@/utils/copyToClipboard";

describe("copyToClipboard", () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = mockClipboard();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("성공 시 writeText 호출", async () => {
    await copyToClipboard("https://example.com/path#hash");
    expect(writeText).toHaveBeenCalledWith(
      "https://example.com/path#hash"
    );
  });

  it("clipboard 미지원 시 throw", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    });
    await expect(copyToClipboard("x")).rejects.toThrow(/클립보드 API/);
  });

  it("writeText 거부 시 throw", async () => {
    writeText.mockRejectedValue(new Error("denied"));
    await expect(copyToClipboard("x")).rejects.toThrow(/copyToClipboard/);
  });
});
