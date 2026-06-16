import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/shared/config/nav";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex w-full items-center bg-background px-16 py-2">
      <div className="flex flex-1 items-center justify-between">
        <Link href="#" className="flex items-center gap-16">
          <Image
            src="/images/logomark.svg"
            alt="Catering by Loft Hall"
            width={41}
            height={26}
            unoptimized
            className="h-[26px] w-[41px]"
          />
          <span className="text-sm whitespace-nowrap">Catering by Loft Hall</span>
        </Link>

        <nav className="flex items-center gap-16">
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
      </div>
    </header>
  );
}
