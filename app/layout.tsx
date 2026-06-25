import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "600"],
});

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "운명랩 | AI 사주 운세",
  description: "운명랩에서 생년월일과 태어난 시간으로 나만의 사주와 운세를 확인하세요",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#08080f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
