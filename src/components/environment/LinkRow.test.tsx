import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { LinkRow } from "@/components/environment/LinkRow";

vi.mock("@/utils/copyToClipboard", () => ({
  copyToClipboard: vi.fn(),
}));

describe("LinkRow (T-038 복사)", () => {
  it("복사 클릭 시 hash 포함 전체 URL이 copyToClipboard에 전달된다", async () => {
    vi.mocked(copyToClipboard).mockResolvedValue(undefined);
    const url =
      "https://author.example.com/ui#/aem/sites.html/content/lgebtb/gb";
    const user = userEvent.setup();

    render(<LinkRow label="Admin" url={url} />);

    await user.click(screen.getByRole("button", { name: /URL 복사/i }));

    await waitFor(() => {
      expect(copyToClipboard).toHaveBeenCalledWith(url);
      expect(screen.getByRole("button", { name: /복사됨/i })).toBeInTheDocument();
    });
  });
});
