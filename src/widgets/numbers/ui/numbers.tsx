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
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background py-section xl:items-center">
      {/* Десктоп: фуллскрин-фон */}
      <Image
        src="/images/numbers/numbers-bg.jpg"
        alt=""
        fill
        quality={85}
        sizes="100vw"
        className="pointer-events-none hidden object-cover xl:block"
      />

      <Container className="relative">
        <div className="flex flex-col gap-8 xl:grid xl:grid-cols-2 xl:gap-x-[clamp(4rem,8vw,12.5rem)] xl:gap-y-12">
          <SectionLabel
            number="01"
            name="ДОВЕРИЕ · ЦИФРЫ"
            className="xl:col-start-1 xl:row-start-1"
          />

          <div className="flex flex-col gap-6 xl:col-start-1 xl:row-start-2 xl:gap-8">
            <h2 className="text-h2">
              Мы понимаем
              <br className="hidden xl:inline" /> не только гастрономию,
              <br className="hidden xl:inline" /> но и механику события.
            </h2>
            <p className="max-w-[281px] text-body font-normal xl:max-w-none">
              Тайминг, логистику, движение гостей,
              <br className="hidden xl:inline" /> ритм вечера – это то, с чем мы
              работаем
              <br className="hidden xl:inline" /> уже больше 10 лет.
            </p>
          </div>

          {/* Мобайл: контейнерное фото */}
          <div className="relative aspect-[358/256] w-full overflow-hidden rounded-sm xl:hidden">
            <Image
              src="/images/numbers/numbers-bg.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-8 xl:col-start-2 xl:row-start-2 xl:py-2">
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
