import type { Metadata } from "next";
import { Inter_Tight, Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-oswald",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Преемство — ремонт квартир под ключ",
  description:
    "Ремонт квартир под ключ в Москве и Московской области. Смета до начала работ, контроль на каждом этапе.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${oswald.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full font-ui">{children}</body>
    </html>
  );
}
