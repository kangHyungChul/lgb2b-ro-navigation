import { EnvironmentSection } from "@/components/environment/EnvironmentSection";
import { ENV_DISPLAY_ORDER } from "@/components/environment/envOrder";
import type { Country, ResolvedEnvironmentUrls } from "@/types";
import { formatLocaleCodesDisplay } from "@/utils/countryLocales";

type EnvironmentPanelProps = {
  country: Country;
  resolvedUrls: ResolvedEnvironmentUrls | null;
  urlError?: string | null;
};

/** 선택 국가 헤더 고정 + 환경 카드 영역 스크롤 */
export function EnvironmentPanel({
  country,
  resolvedUrls,
  urlError,
}: EnvironmentPanelProps) {
  const localeDisplay = formatLocaleCodesDisplay(country);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <header className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          {country.name}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          <span className="text-slate-500">countryCode</span>{" "}
          <span className="font-mono font-medium text-slate-800">
            {country.countryCode}
          </span>
          <span className="mx-2 text-slate-300">·</span>
          <span className="text-slate-500">localeCode</span>{" "}
          <span className="font-mono font-medium text-slate-800">
            {localeDisplay}
          </span>
        </p>
      </header>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-0.5">
        {urlError ? (
          <p className="text-sm text-amber-800" role="alert">
            {urlError}
          </p>
        ) : null}

        {resolvedUrls && !urlError ? (
          <div className="flex flex-col gap-3 pb-1">
            {ENV_DISPLAY_ORDER.map((kind) => (
              <EnvironmentSection
                key={kind}
                kind={kind}
                links={resolvedUrls[kind]}
              />
            ))}
          </div>
        ) : !urlError ? (
          <p className="text-sm text-slate-500">URL 없음</p>
        ) : null}
      </div>
    </div>
  );
}
