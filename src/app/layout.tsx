import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: {
    default: "John K. — 풀스택 개발자",
    template: "%s | John K.",
  },
  description:
    "풀스택 개발자 John의 포트폴리오 — 서버부터 화면까지 직접 만듭니다.",
  keywords: ["풀스택 개발자", "포트폴리오", "Next.js", "TypeScript", "Go", "Kubernetes"],
  authors: [{ name: "John K." }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "John K. — 풀스택 개발자",
    description: "풀스택 개발자 John의 포트폴리오 — 서버부터 화면까지 직접 만듭니다.",
    siteName: "John K. Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "John K. — 풀스택 개발자",
    description: "풀스택 개발자 John의 포트폴리오 — 서버부터 화면까지 직접 만듭니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={pretendard.variable}>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
