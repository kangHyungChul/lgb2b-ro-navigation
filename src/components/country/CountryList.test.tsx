import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CountryList } from "@/components/country/CountryList";
import { countries } from "@/data/countries";
import { COUNTRY_GROUP_EXPAND_COOKIE_NAME } from "@/utils/countryGroupExpandCookie";

describe("CountryList 그룹 접기", () => {
  beforeEach(() => {
    document.cookie = `${COUNTRY_GROUP_EXPAND_COOKIE_NAME}=; Max-Age=0; Path=/`;
  });

  it("OPENED 기본 접힘 → Global 항목 숨김", () => {
    render(
      <CountryList
        countries={countries}
        selectedId={null}
        onSelect={() => {}}
      />
    );

    expect(
      screen.queryByRole("option", { name: /Global/i })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Thailand/i })).toBeInTheDocument();
  });

  it("검색 중(isSearchActive)이면 접힌 GROUP2도 결과를 펼쳐 표시", () => {
    const onlyCanada = countries.filter((c) => c.id === "ca");

    render(
      <CountryList
        countries={onlyCanada}
        selectedId={null}
        onSelect={() => {}}
        isSearchActive
      />
    );

    expect(
      screen.getByRole("option", { name: /Canada/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /GROUP2/i, expanded: true })
    ).toBeInTheDocument();
  });

  it("OPENED 헤더 클릭 시 펼침", async () => {
    const user = userEvent.setup();
    render(
      <CountryList
        countries={countries}
        selectedId={null}
        onSelect={() => {}}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /OPENED/i, expanded: false })
    );

    expect(screen.getByRole("option", { name: /Global/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /India/i })).toBeInTheDocument();
  });
});
