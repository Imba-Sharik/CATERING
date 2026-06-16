import Image from "next/image";
import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { cn } from "@/shared/lib/utils";

function FooterInfo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-5 font-normal", className)}>
      <p>placebo25.com</p>
      <p>ул. Ленинская Слобода, 26с 15, Москва</p>
      <div className="flex flex-col gap-3">
        <span>© 2026</span>
        <span>LOFT HALL</span>
        <Link href="#" className="underline-offset-4 hover:underline">
          Политика конфиденциальности
        </Link>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="relative flex min-h-[600px] flex-col overflow-hidden border-t border-foreground bg-background md:min-h-[317px]"
    >
      <Image
        src="/images/footer/footer-bg.jpg"
        alt=""
        fill
        quality={85}
        sizes="100vw"
        className="pointer-events-none scale-x-[-1] object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <Container className="relative flex flex-1 flex-col justify-between py-10 md:py-16">
        <div className="flex items-start justify-between">
          <Image
            src="/images/footer/footer-logo.svg"
            alt="Catering by Loft Hall"
            width={229}
            height={91}
            unoptimized
            className="h-[68px] w-[171px] md:h-[91px] md:w-[229px]"
          />
          {/* Десктоп: инфо справа сверху */}
          <FooterInfo className="hidden text-sm md:flex" />
        </div>

        <div className="flex items-end justify-between gap-24 md:block">
          <p className="text-xs font-normal md:pt-8 md:text-sm">
            CATERING BY LOFTHALL
          </p>
          {/* Мобайл: инфо справа снизу */}
          <FooterInfo className="flex text-xs md:hidden" />
        </div>
      </Container>
    </footer>
  );
}
