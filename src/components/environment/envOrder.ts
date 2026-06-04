import type { EnvironmentKind } from "@/types";

/** UI 환경 블록 노출 순서: DEV → STG → PROD */
export const ENV_DISPLAY_ORDER: EnvironmentKind[] = ["dev", "stg", "prod"];
