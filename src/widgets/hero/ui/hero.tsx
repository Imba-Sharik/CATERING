import Image from "next/image";
import { Button } from "@/shared/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center overflow-hidden bg-background"
    >
      {/* Фон */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative flex w-full max-w-[358px] flex-1 flex-col items-center justify-center gap-30 px-4 py-12 md:w-[387px] md:max-w-none md:gap-12 md:px-0">
        <div className="flex w-full flex-col items-center gap-16">
          <Image
            src="/images/hero/hero-logo.svg"
            alt="CATERING"
            width={200}
            height={80}
            priority
            unoptimized
            className="h-[65px] w-[163px] md:h-20 md:w-[200px]"
          />

          <div className="flex w-full flex-col items-center gap-4 text-center md:gap-8">
            <h1 className="text-display">Кейтеринг в Москве</h1>
            <p className="text-lead">
              Гастрономический сценарий для событий любого масштаба
            </p>
            <div className="flex flex-col items-center gap-1 text-xs font-normal text-muted-foreground md:text-sm">
              <span>Московская область</span>
              <span>Москва</span>
            </div>
          </div>
        </div>

        <div className="flex w-[116px] flex-col items-center gap-3 md:w-[192px]">
          <Button
            variant="outline"
            className="h-[30px] w-full text-[8px] md:h-[38px] md:text-sm"
          >
            Получить предложение
          </Button>
          <Button
            variant="outline"
            className="h-[30px] text-[8px] md:h-[38px] md:text-sm"
          >
            Смотреть форматы
          </Button>
        </div>
      </div>
    </section>
  );
}
