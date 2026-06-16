import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { SiteHeader } from "@/widgets/site-header";

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

      <SiteHeader />

      <div className="relative flex w-[387px] max-w-full flex-1 flex-col items-center justify-center gap-12 py-16">
        <div className="flex flex-col items-center gap-16">
          <Image
            src="/images/hero/hero-logo.svg"
            alt="CATERING"
            width={200}
            height={80}
            priority
            unoptimized
            className="h-20 w-[200px]"
          />

          <div className="flex flex-col items-center gap-8 text-center">
            <h1 className="text-3xl">Кейтеринг в Москве</h1>
            <p className="text-lg">
              Гастрономический сценарий для событий любого масштаба
            </p>
            <div className="flex flex-col items-center gap-1 text-sm font-normal text-muted-foreground">
              <span>Московская область</span>
              <span>Москва</span>
            </div>
          </div>
        </div>

        <div className="flex w-[192px] flex-col items-center gap-3">
          <Button variant="outline" className="w-full">
            Получить предложение
          </Button>
          <Button variant="outline">Смотреть форматы</Button>
        </div>
      </div>
    </section>
  );
}
