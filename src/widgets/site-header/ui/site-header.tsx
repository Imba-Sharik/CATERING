import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NAV_ITEMS } from "@/shared/config/nav";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex w-full items-center bg-background px-6 py-2.5 md:px-16 md:py-2">
      <div className="flex flex-1 items-center justify-between">
        <Link href="#" className="flex items-center gap-[22px] md:gap-16">
          <Image
            src="/images/hero/logomark.svg"
            alt="Catering by Loft Hall"
            width={41}
            height={26}
            unoptimized
            className="h-[20px] w-[27px] md:h-[26px] md:w-[41px]"
          />
          <span className="text-xs whitespace-nowrap md:text-sm">
            Catering by Loft Hall
          </span>
        </Link>

        {/* Десктоп: навигация */}
        <nav className="hidden items-center gap-16 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-6 py-3 text-center text-sm whitespace-nowrap text-foreground/90 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Мобайл: бургер */}
        <button
          type="button"
          aria-label="Меню"
          className="flex size-6 items-center justify-center text-foreground md:hidden"
        >
          <Menu className="size-6" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
