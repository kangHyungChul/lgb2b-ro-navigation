import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";
import "./globals.css";

/** Google Analytics 4 측정 ID */
const GA_MEASUREMENT_ID = "G-Q4VQ8SFCLN";

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
      <Analytics />
      <body className="h-dvh overflow-hidden antialiased text-slate-900">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
