import { ImageResponse } from "next/og";

/** T-032: 탭 아이콘 (public/favicon.svg와 동등, metadata title은 T-027) */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0284c7",
          color: "#ffffff",
          fontSize: 20,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        G
      </div>
    ),
    { ...size }
  );
}
