import type { Metadata, Viewport } from "next";
import { sfPro } from "@/shared/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CATERING by Loft Hall — выездной кейтеринг в Москве",
  description:
    "Выездной кейтеринг полного цикла: фуршеты, банкеты, кофе-брейки, декор и сервировка. Москва и область.",
};

// theme-color = цвет фона: встроенные браузеры (Telegram, Safari) красят свою
// верхнюю панель в этот цвет — иначе Telegram берёт цвет из верха страницы
// (зелёный hero) и появляется «зазор» над тёмным хедером.
export const viewport: Viewport = {
  themeColor: "#000000",
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
