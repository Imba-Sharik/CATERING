"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** Доля элемента в зоне видимости для срабатывания (0–1) */
  threshold?: number;
  /** Сдвиг границы наблюдения; «-10%» снизу = триггер чуть раньше выхода в центр */
  rootMargin?: string;
  /** Сработать один раз и отписаться (по умолчанию да) */
  once?: boolean;
};

/**
 * Наблюдает за элементом через IntersectionObserver и сообщает, попал ли он
 * во вьюпорт. Вся анимация — на CSS; хук лишь переключает флаг.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } =
    options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Среды без IntersectionObserver — показываем сразу, без анимации.
    // Одноразовый fallback, каскадного ререндера нет.
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
