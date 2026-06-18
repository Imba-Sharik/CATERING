import type { MouseEvent } from "react";

// Скролл к якорю по клику. Нужен, потому что нативная навигация по <a href="#id">
// не срабатывает, если такой хэш уже стоит в URL (браузер не меняет hash → не скроллит).
export function scrollToAnchor(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("#")) return;
  const el = document.getElementById(href.slice(1));
  if (!el) return;

  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth" });
  // Обновляем хэш без прыжка (scrollIntoView уже проскроллил плавно)
  history.replaceState(null, "", href);
}
