"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/shared/config/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // оверлей в DOM (держим на время анимации выхода)
  const [show, setShow] = useState(false); // активное (проявленное) состояние

  // Монтаж/размонтаж — в обработчиках; setShow для входа/выхода — в колбэках эффекта
  const openMenu = () => {
    setMounted(true);
    setOpen(true);
  };
  const closeMenu = () => {
    setShow(false); // запускаем анимацию выхода
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      // следующий кадр — включаем проявление (чтобы сработал transition с 0)
      const raf = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(raf);
    }
    const t = setTimeout(() => setMounted(false), 350); // = длительности transition оверлея
    return () => clearTimeout(t);
  }, [open]);

  // Блок скролла body + закрытие по Esc, пока меню открыто
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* Триггер — бургер/крестик в хедере (только мобайл). Лого не дублируем:
          постоянный логотип остаётся в SiteHeader (z выше оверлея) → не мигает */}
      <button
        type="button"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        onClick={() => (open ? closeMenu() : openMenu())}
        className="relative z-50 flex size-6 items-center justify-center text-foreground lg:hidden"
      >
        {/* Кроссфейд иконок: обе в одной точке, переключаем opacity/scale */}
        <Menu
          aria-hidden
          strokeWidth={1.5}
          className={`absolute size-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <X
          aria-hidden
          strokeWidth={1.5}
          className={`absolute size-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
          }`}
        />
      </button>

      {/* Фуллскрин-оверлей — только навигация, без дубля шапки */}
      {mounted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          data-show={show}
          className="menu-overlay fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background lg:hidden"
        >
          {/* Навигация — по центру, пункты появляются каскадом */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-3">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  // ждём снятия body overflow:hidden, иначе скролл не сработает
                  requestAnimationFrame(() =>
                    document
                      .getElementById(item.href.slice(1))
                      ?.scrollIntoView({ behavior: "smooth" }),
                  );
                  history.replaceState(null, "", item.href);
                }}
                data-show={show}
                style={
                  { "--menu-delay": `${0.08 + i * 0.05}s` } as CSSProperties
                }
                className="menu-item px-6 py-2.5 text-center text-base whitespace-nowrap text-foreground/90 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
