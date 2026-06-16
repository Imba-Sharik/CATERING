import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Stat } from "@/shared/ui/stat";
import { Divider } from "@/shared/ui/divider";

const STATS = [
  { value: "11 лет", caption: "На событийном рынке" },
  { value: "2 200 +", caption: "Мероприятий в год" },
  { value: "10 000 +", caption: "Довольных гостей" },
] as const;

export function Numbers() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background py-14 md:items-center md:py-24">
      {/* Десктоп: фуллскрин-фон */}
      <Image
        src="/images/numbers/numbers-bg.jpg"
        alt=""
        fill
        quality={85}
        sizes="100vw"
        className="pointer-events-none hidden object-cover md:block"
      />

      <Container className="relative">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-x-[200px] md:gap-y-12">
          <SectionLabel
            number="01"
            name="ДОВЕРИЕ · ЦИФРЫ"
            className="md:col-start-1 md:row-start-1"
          />

          <div className="flex flex-col gap-6 md:col-start-1 md:row-start-2 md:gap-8">
            <h2 className="text-xl md:text-2xl">
              Мы понимаем
              <br className="hidden md:inline" /> не только гастрономию,
              <br className="hidden md:inline" /> но и механику события.
            </h2>
            <p className="max-w-[281px] text-sm font-normal md:max-w-none md:text-base">
              Тайминг, логистику, движение гостей,
              <br className="hidden md:inline" /> ритм вечера – это то, с чем мы
              работаем
              <br className="hidden md:inline" /> уже больше 10 лет.
            </p>
          </div>

          {/* Мобайл: контейнерное фото */}
          <div className="relative h-[256px] w-full overflow-hidden rounded-sm md:hidden">
            <Image
              src="/images/numbers/numbers-bg.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-8 md:col-start-2 md:row-start-2 md:py-2">
            {STATS.map((stat, i) => (
              <div key={stat.value} className="flex flex-col gap-8">
                {i > 0 && <Divider />}
                <Stat value={stat.value} caption={stat.caption} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
