import localFont from "next/font/local";

// SF Pro Display — шрифт макета. Используемые начертания: Regular 400, Medium 510, Semibold 590.
export const sfPro = localFont({
  variable: "--font-sf-pro",
  display: "swap",
  src: [
    { path: "./SFProDisplay-Regular.otf", weight: "400", style: "normal" },
    { path: "./SFProDisplay-Medium.otf", weight: "500", style: "normal" },
    { path: "./SFProDisplay-Semibold.otf", weight: "600", style: "normal" },
  ],
});
