import type { Metadata } from "next";
import { sfPro } from "@/shared/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CATERING by Loft Hall — выездной кейтеринг в Москве",
  description:
    "Выездной кейтеринг полного цикла: фуршеты, банкеты, кофе-брейки, декор и сервировка. Москва и область.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${sfPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
