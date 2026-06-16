"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/shared/config/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Блок скролла body + закрытие по Esc, пока меню открыто
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* Триггер — бургер в хедере (только мобайл) */}
      <button
        type="button"
        aria-label="Открыть меню"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex size-6 items-center justify-center text-foreground md:hidden"
      >
        <Menu className="size-6" strokeWidth={1.5} />
      </button>

      {/* Фуллскрин-оверлей */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background md:hidden"
        >
          {/* Хедер оверлея — лого + крестик */}
          <div className="flex w-full items-center justify-between px-6 py-2.5">
            <Link
              href="#hero"
              onClick={() => setOpen(false)}
              className="flex items-center gap-[22px]"
            >
              <Image
                src="/images/hero/logomark.svg"
                alt="Catering by Loft Hall"
                width={41}
                height={26}
                unoptimized
                className="h-[20px] w-[27px]"
              />
              <span className="text-xs whitespace-nowrap">
                Catering by Loft Hall
              </span>
            </Link>

            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
              className="flex size-6 items-center justify-center text-foreground"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Навигация — по центру */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-6 py-2.5 text-center text-base whitespace-nowrap text-foreground/90 transition-colors hover:text-foreground"
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
