"use client";

import type { CSSProperties, ElementType, ReactNode, Ref } from "react";
import { useInView } from "@/shared/hooks/use-in-view";
import { cn } from "@/shared/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Тег-обёртка (div по умолчанию). Семантику задаёшь сам: "h2", "p", "li"… */
  as?: ElementType;
  /** Задержка старта, мс — для каскада (stagger) у соседних блоков */
  delay?: number;
  /** Стартовый сдвиг по Y, px (по умолчанию 24) */
  y?: number;
  /** Стартовое размытие, px (по умолчанию 8) */
  blur?: number;
  /** Длительность, мс (по умолчанию 700) */
  duration?: number;
  /** Повторять при каждом входе во вьюпорт (по умолчанию один раз) */
  repeat?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Серверо-дружелюбный reveal-врапер: клиентский только он сам, `children`
 * остаются server-rendered. Анимацию и reduced-motion держит CSS (.reveal).
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y,
  blur,
  duration,
  repeat = false,
  className,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ once: !repeat });

  // CSS-переменные тюнинга reveal. Кастуем к строковой карте, т.к. CSSProperties
  // не индексируется произвольными кастомными свойствами.
  const vars = { ...style } as Record<string, string | number | undefined>;
  if (delay) vars["--reveal-delay"] = `${delay}ms`;
  if (y !== undefined) vars["--reveal-y"] = `${y}px`;
  if (blur !== undefined) vars["--reveal-blur"] = `${blur}px`;
  if (duration !== undefined) vars["--reveal-duration"] = `${duration}ms`;

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      data-show={inView ? "true" : "false"}
      className={cn("reveal", className)}
      style={vars as CSSProperties}
    >
      {children}
    </Tag>
  );
}
