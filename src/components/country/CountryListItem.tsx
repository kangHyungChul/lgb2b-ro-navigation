"use client";

import { forwardRef } from "react";
import type { Country } from "@/types";
import { formatLocaleCodesDisplay } from "@/utils/countryLocales";

type CountryListItemProps = {
  country: Country;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export const CountryListItem = forwardRef<HTMLButtonElement, CountryListItemProps>(
  function CountryListItem({ country, isSelected, onSelect }, ref) {
    const localeDisplay = formatLocaleCodesDisplay(country);

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={isSelected}
        aria-label={`${country.name}, ${localeDisplay}`}
        onClick={() => onSelect(country.id)}
        className={`flex w-full items-baseline gap-1.5 rounded-md border px-2 py-1.5 text-left text-sm transition-colors ${
          isSelected
            ? "border-sky-500 bg-sky-100 font-semibold text-sky-950"
            : "border-transparent text-slate-800 hover:border-slate-200 hover:bg-slate-50"
        }`}
      >
        <span className="min-w-0 flex-1 truncate">{country.name}</span>
        <span
          className={`shrink-0 font-mono text-xs ${
            isSelected ? "text-sky-800" : "text-slate-500"
          }`}
        >
          {localeDisplay}
        </span>
      </button>
    );
  }
);
