"use client";

import type { ComponentProps } from "react";
import { scrollToAnchor } from "@/shared/lib/scroll-to-anchor";

// <a>-якорь, который скроллит к секции даже если такой хэш уже стоит в URL.
// Можно класть внутрь <Button asChild>.
export function AnchorLink({
  href,
  onClick,
  ...props
}: ComponentProps<"a"> & { href: string }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        scrollToAnchor(e, href);
        onClick?.(e);
      }}
      {...props}
    />
  );
}
