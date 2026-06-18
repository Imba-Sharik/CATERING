"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { scrollToAnchor } from "@/shared/lib/scroll-to-anchor";

// Ссылка-якорь для десктоп-навигации. Скроллит к секции даже если хэш уже в URL.
export function NavLink({ href, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      onClick={(e) => scrollToAnchor(e, String(href))}
      {...props}
    />
  );
}
