"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

// Горизонтальная прокрутка перетаскиванием мышью (тач скроллит нативно).
export function DragScroll({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ref = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef({ active: false, startX: 0, scrollLeft: 0 });

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el || el.scrollWidth <= el.clientWidth) return; // нет горизонтального скролла
    e.preventDefault(); // гасим выделение текста и авто-скролл страницы
    drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active || !ref.current) return;
    e.preventDefault();
    ref.current.scrollLeft =
      drag.current.scrollLeft - (e.clientX - drag.current.startX);
  }

  function onPointerEnd(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    drag.current.active = false;
    ref.current?.releasePointerCapture(e.pointerId);
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      className={cn("md:cursor-grab md:select-none md:active:cursor-grabbing", className)}
      {...props}
    >
      {children}
    </div>
  );
}
