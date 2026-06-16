import Image from "next/image";
import Link from "next/link";
import { Container } from "@/shared/ui/container";

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="relative min-h-[317px] overflow-hidden border-t border-foreground bg-background"
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

      <Container className="relative flex h-full min-h-[317px] flex-col py-16">
        <div className="flex justify-between gap-8">
          <Image
            src="/images/footer/footer-logo.svg"
            alt="Catering by Loft Hall"
            width={229}
            height={91}
            unoptimized
            className="h-[91px] w-[229px]"
          />

          <div className="flex flex-col gap-5 text-sm font-normal">
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
        </div>

        <p className="mt-auto pt-8 text-sm font-normal">CATERING BY LOFTHALL</p>
      </Container>
    </footer>
  );
}
