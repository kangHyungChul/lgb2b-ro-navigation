import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NavigatorClient } from "@/components/NavigatorClient";

describe("NavigatorClient (T-038)", () => {
  it("검색 후 목록 필터", async () => {
    const user = userEvent.setup();
    render(<NavigatorClient />);

    expect(screen.getByRole("option", { name: /Thailand/i })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /United Kingdom/i })
    ).toBeInTheDocument();

    await user.type(screen.getByRole("searchbox"), "UK");

    await waitFor(
      () => {
        expect(
          screen.queryByRole("option", { name: /^Global$/i })
        ).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it("국가 선택 시 환경 섹션·PROD 3 Site/Admin 링크", async () => {
    const user = userEvent.setup();
    render(<NavigatorClient />);

    await user.click(
      screen.getByRole("option", { name: /United Kingdom/i })
    );

    expect(screen.getByText("Site")).toBeInTheDocument();
    expect(screen.getAllByText("NCMS").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByText("AEM").length).toBeGreaterThanOrEqual(3);
    const envBadges = screen.getAllByText(/^(DEV|STG|PROD)$/);
    expect(envBadges.map((el) => el.textContent)).toEqual(["DEV", "STG", "PROD"]);
    expect(screen.getByText("OPENED")).toBeInTheDocument();
    expect(screen.getByText("GROUP1")).toBeInTheDocument();
    expect(screen.getByText("GROUP2")).toBeInTheDocument();
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(7);
    expect(
      screen.getByRole("link", {
        name: /lg\.com\/uk\/business/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /author-p155411-e1648866/i,
      })
    ).toBeInTheDocument();
  });
});
