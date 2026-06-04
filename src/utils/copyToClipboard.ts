/**
 * Clipboard API 래퍼 — CopyButton 등 Client에서만 호출 (T-010)
 * 실패 시 reject하여 호출부가 한국어 안내·토스트 처리
 */

/** 브라우저에서 writeText 가능 여부 */
function canUseClipboard(): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.clipboard !== "undefined" &&
    typeof navigator.clipboard.writeText === "function"
  );
}

/**
 * 문자열을 시스템 클립보드에 복사한다.
 * @throws 미지원 환경·권한 거부·writeText 실패
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (!canUseClipboard()) {
    throw new Error(
      "copyToClipboard: 이 환경에서는 클립보드 API를 사용할 수 없습니다"
    );
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (cause) {
    const message =
      cause instanceof Error ? cause.message : "클립보드 복사에 실패했습니다";
    throw new Error(`copyToClipboard: ${message}`, { cause });
  }
}
