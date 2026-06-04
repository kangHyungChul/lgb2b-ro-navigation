import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** 외부 URL — 새 탭·noopener (빈 href는 렌더하지 않음) */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  const trimmed = href.trim();
  if (!trimmed) {
    return null;
  }

  return (
    <a
      href={trimmed}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "text-sky-700 underline-offset-2 hover:underline"}
    >
      {children}
    </a>
  );
}
