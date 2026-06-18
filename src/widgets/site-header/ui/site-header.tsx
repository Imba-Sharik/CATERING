import Image from "next/image";
import { NAV_ITEMS } from "@/shared/config/nav";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center bg-background px-6 py-2.5 lg:py-2 lg:px-[clamp(1.5rem,9.62vw_-_4.66rem,4rem)]">
      <div className="flex flex-1 items-center justify-between gap-4">
        <NavLink
          href="#hero"
          className="relative z-50 flex items-center gap-[22px] lg:gap-[clamp(1.5rem,9.62vw_-_4.66rem,4rem)]"
        >
          <Image
            src="/images/hero/logomark.svg"
            alt="Catering by Loft Hall"
            width={41}
            height={26}
            unoptimized
            className="h-[20px] w-[27px] lg:h-[26px] lg:w-[41px]"
          />
          <span className="text-sm whitespace-nowrap lg:text-sm">
            Catering by Loft Hall
          </span>
        </NavLink>

        {/* Десктоп: нав с lg. Гэп текучий: к 1024 ужимается (помещается),
            на 1440 = 64px (Figma), выше 1440 растёт пропорционально (4.44vw) */}
        <nav className="hidden items-center gap-[clamp(1rem,11.54vw_-_6.39rem,4.44vw)] lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="px-6 py-3 text-center text-sm whitespace-nowrap text-foreground/90 transition-colors hover:text-foreground"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Мобайл: бургер + фуллскрин-меню */}
        <MobileMenu />
      </div>
    </header>
  );
}
