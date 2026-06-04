import { vi } from "vitest";

/** jsdom clipboard.writeText mock — 호출 assertion용 (T-036·T-038) */
export function mockClipboard() {
  const writeText = vi.fn().mockResolvedValue(undefined);

  if (navigator.clipboard) {
    vi.spyOn(navigator.clipboard, "writeText").mockImplementation(writeText);
  } else {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
      writable: true,
    });
  }

  return writeText;
}
