"use client";

type CountrySearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CountrySearchInput({
  value,
  onChange,
}: CountrySearchInputProps) {
  return (
    <div className="border-b border-slate-100 px-3 py-2">
      <label htmlFor="country-search" className="sr-only">
        국가명 검색
      </label>
      <input
        id="country-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="국가명 검색"
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        autoComplete="off"
      />
    </div>
  );
}
