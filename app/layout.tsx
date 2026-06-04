import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LG B2B Navigator",
  description: "국가별 Site·AEM URL 탐색 (내부용)",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="h-dvh overflow-hidden antialiased text-slate-900">
        {children}
      </body>
    </html>
  );
}
