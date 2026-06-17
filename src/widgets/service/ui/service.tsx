import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Divider } from "@/shared/ui/divider";
import { Reveal } from "@/shared/ui/reveal";

const ITEMS = [
  { number: "01", title: "Коммуникация" },
  { number: "02", title: "Подача" },
  { number: "03", title: "Работа с гостями" },
  { number: "04", title: "Сервисная этика" },
  { number: "05", title: "Сценарии обслуживания" },
] as const;

export function Service() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background py-section md:items-center">
      {/* Десктоп: фуллскрин-фон */}
      <Image
        src="/images/service/service-bg-v2.jpg"
        alt=""
        fill
        quality={85}
        sizes="(min-width: 768px) 100vw, 1px"
        className="pointer-events-none hidden object-cover md:block"
      />

      <Container className="relative flex flex-col gap-8 md:gap-12">
        <Reveal>
          <SectionLabel number="05" name="СЕРВИС" />
        </Reveal>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:gap-x-[clamp(4rem,14vw,12.5rem)] md:gap-y-12">
          <div className="flex flex-col gap-6 md:min-h-[689px] md:gap-8">
            <Reveal as="h2" className="text-h2">
              Сервис как система
            </Reveal>
            <Reveal as="p" delay={120} className="text-body font-normal">
              Собственная Академия Сервиса.
              <br className="hidden md:inline" /> Все сотрудники проходят
              внутреннюю
              <br className="hidden md:inline" /> подготовку по единым стандартам
              LOFT HALL.
            </Reveal>
          </div>

          {/* Мобайл: контейнерное фото */}
          <div className="relative aspect-[358/256] w-full overflow-hidden rounded-sm md:hidden">
            <Image
              src="/images/service/service-bg-v2.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 1px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex w-full flex-col gap-8 md:max-w-[632px]">
            {ITEMS.map((item, i) => (
              <Reveal
                key={item.number}
                delay={i * 80}
                className="flex flex-col gap-8"
              >
                {i > 0 && <Divider className="hidden md:block" />}
                <div className="flex items-center gap-3 md:gap-24">
                  <span className="text-h3">{item.number}</span>
                  <span className="text-h3">{item.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
