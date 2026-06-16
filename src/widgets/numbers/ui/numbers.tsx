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
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background py-24">
      <Image
        src="/images/numbers/numbers-bg.jpg"
        alt=""
        fill
        quality={85}
        sizes="100vw"
        className="pointer-events-none object-cover"
      />

      <Container className="relative">
        <div className="grid grid-cols-2 gap-x-[200px] gap-y-12">
          <SectionLabel
            number="01"
            name="ДОВЕРИЕ · ЦИФРЫ"
            className="col-start-1 row-start-1"
          />

          <div className="col-start-1 row-start-2 flex flex-col gap-8">
            <h2 className="text-2xl">
              Мы понимаем
              <br />
              не только гастрономию,
              <br />
              но и механику события.
            </h2>
            <p className="text-base font-normal">
              Тайминг, логистику, движение гостей,
              <br />
              ритм вечера – это то, с чем мы работаем
              <br />
              уже больше 10 лет.
            </p>
          </div>

          <div className="col-start-2 row-start-2 flex flex-col gap-8 py-2">
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
