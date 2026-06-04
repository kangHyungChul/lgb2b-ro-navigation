import { Badge } from "@/components/common/Badge";
import { LinkRow } from "@/components/environment/LinkRow";
import type { EnvironmentKind, EnvironmentLinks } from "@/types";
import { linkRowLabel, linkRowLabelForSite } from "@/utils/linkRowLabel";

type EnvironmentSectionProps = {
  kind: EnvironmentKind;
  links: EnvironmentLinks;
};

const ENV_HEADING: Record<EnvironmentKind, string> = {
  dev: "DEV 환경",
  stg: "STG 환경",
  prod: "PROD 환경",
};

/** 환경 블록 — 로케일별 Site·NCMS + Admin 1건 */
export function EnvironmentSection({ kind, links }: EnvironmentSectionProps) {
  const rows: { label: string; url: string; key: string }[] = [];
  const multipleLocales = links.sites.length > 1;

  for (const siteLocale of links.sites) {
    rows.push({
      key: `${kind}-site-${siteLocale.localeCode}`,
      label: linkRowLabelForSite(siteLocale.site, siteLocale, multipleLocales),
      url: siteLocale.site,
    });

    if (kind === "prod" && siteLocale.siteNcms) {
      rows.push({
        key: `${kind}-ncms-${siteLocale.localeCode}`,
        label: linkRowLabelForSite(
          siteLocale.siteNcms,
          siteLocale,
          multipleLocales
        ),
        url: siteLocale.siteNcms,
      });
    }
  }

  rows.push({
    key: `${kind}-admin`,
    label: linkRowLabel(links.admin, "admin"),
    url: links.admin,
  });

  const headingId = `env-heading-${kind}`;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 shadow-sm"
    >
      <div className="mb-2 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <h3 id={headingId} className="text-sm font-semibold text-slate-800">
          {ENV_HEADING[kind]}
        </h3>
        <Badge kind={kind} />
      </div>
      <div className="space-y-0.5">
        {rows.map((row) => (
          <LinkRow
            key={`${kind}-${row.key}`}
            label={row.label}
            url={row.url}
          />
        ))}
      </div>
    </section>
  );
}
