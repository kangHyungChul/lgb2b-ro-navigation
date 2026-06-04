"use client";

import { useCallback, useState } from "react";
import { copyToClipboard } from "@/utils/copyToClipboard";

type CopyButtonProps = {
  text: string;
  onSuccess?: () => void;
};

/** 클립보드 복사 + 시각·aria-live 피드백 (T-029, ARCHITECTURE §4.5) */
export function CopyButton({ text, onSuccess }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState("");

  const handleCopy = useCallback(async () => {
    setError(null);
    setLiveMessage("");
    try {
      await copyToClipboard(text);
      setCopied(true);
      setLiveMessage("복사됨");
      onSuccess?.();
      window.setTimeout(() => {
        setCopied(false);
        setLiveMessage("");
      }, 2000);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "클립보드 복사에 실패했습니다";
      setError(msg);
      setLiveMessage("");
      window.alert(`복사할 수 없습니다: ${msg}`);
    }
  }, [text, onSuccess]);

  return (
    <span className="inline-flex flex-col items-start gap-0.5">
      <button
        type="button"
        onClick={() => void handleCopy()}
        className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sky-600"
        aria-label={copied ? "복사됨" : "URL 복사"}
      >
        {copied ? "✓ 복사됨" : "복사"}
      </button>
      <span aria-live="polite" className="sr-only">
        {liveMessage}
      </span>
      {error ? (
        <span className="text-xs text-red-600" role="alert">
          {error}
        </span>
      ) : null}
    </span>
  );
}
