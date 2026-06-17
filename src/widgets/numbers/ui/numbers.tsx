import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Stat } from "@/shared/ui/stat";
import { Divider } from "@/shared/ui/divider";
import { Reveal } from "@/shared/ui/reveal";

const STATS = [
  { value: "11 лет", caption: "На событийном рынке" },
  { value: "2 200 +", caption: "Мероприятий в год" },
  { value: "10 000 +", caption: "Довольных гостей" },
] as const;

export function Numbers() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background py-section xl:items-center">
      {/* Десктоп: фуллскрин-фон */}
      <Image
        src="/images/numbers/numbers-bg-v2.jpg"
        alt=""
        fill
        quality={85}
        sizes="(min-width: 1280px) 100vw, 1px"
        className="pointer-events-none hidden object-cover xl:block"
      />

      <Container className="relative">
        <div className="flex flex-col gap-8 xl:grid xl:grid-cols-2 xl:gap-x-[clamp(4rem,8vw,12.5rem)] xl:gap-y-12">
          <Reveal className="xl:col-start-1 xl:row-start-1">
            <SectionLabel number="01" name="ДОВЕРИЕ · ЦИФРЫ" />
          </Reveal>

          <div className="flex flex-col gap-6 xl:col-start-1 xl:row-start-2 xl:gap-8">
            <Reveal as="h2" className="text-h2" delay={100}>
              Мы понимаем
              <br className="hidden xl:inline" /> не только гастрономию,
              <br className="hidden xl:inline" /> но и механику события.
            </Reveal>
            <Reveal
              as="p"
              delay={220}
              className="max-w-[281px] text-body font-normal xl:max-w-none"
            >
              Тайминг, логистику, движение гостей,
              <br className="hidden xl:inline" /> ритм вечера – это то, с чем мы
              работаем
              <br className="hidden xl:inline" /> уже больше 10 лет.
            </Reveal>
          </div>

          {/* Мобайл: контейнерное фото */}
          <div className="relative aspect-[358/256] w-full overflow-hidden rounded-sm xl:hidden">
            <Image
              src="/images/numbers/numbers-bg-v2.jpg"
              alt=""
              fill
              sizes="(min-width: 1280px) 1px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-8 xl:col-start-2 xl:row-start-2 xl:py-2">
            {STATS.map((stat, i) => (
              <Reveal
                key={stat.value}
                delay={300 + i * 120}
                className="flex flex-col gap-8"
              >
                {i > 0 && <Divider />}
                <Stat value={stat.value} caption={stat.caption} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
