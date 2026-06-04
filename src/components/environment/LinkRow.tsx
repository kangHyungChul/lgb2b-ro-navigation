import { CopyButton } from "@/components/common/CopyButton";
import { ExternalLink } from "@/components/common/ExternalLink";

type LinkRowProps = {
  label: string;
  url: string;
};

function displayUrl(url: string, maxLen = 48): string {
  if (url.length <= maxLen) return url;
  return `${url.slice(0, maxLen - 3)}...`;
}

/** 한 줄: 라벨 · URL · 복사 */
export function LinkRow({ label, url }: LinkRowProps) {
  const trimmed = url.trim();
  if (!trimmed) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 py-1.5 text-sm">
      <span className="w-24 shrink-0 text-slate-600">{label}</span>
      <ExternalLink
        href={trimmed}
        className="min-w-0 flex-1 truncate font-mono text-xs text-sky-700 hover:underline"
      >
        <span title={trimmed}>{displayUrl(trimmed)}</span>
      </ExternalLink>
      <CopyButton text={trimmed} />
    </div>
  );
}
