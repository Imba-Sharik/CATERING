import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Divider } from "@/shared/ui/divider";

const ITEMS = [
  { number: "01", title: "Коммуникация" },
  { number: "02", title: "Подача" },
  { number: "03", title: "Работа с гостями" },
  { number: "04", title: "Сервисная этика" },
  { number: "05", title: "Сценарии обслуживания" },
] as const;

export function Service() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background py-14">
      <Image
        src="/images/service/service-bg.jpg"
        alt=""
        fill
        quality={85}
        sizes="100vw"
        className="pointer-events-none object-cover"
      />

      <Container className="relative flex flex-col gap-12">
        <SectionLabel number="05" name="СЕРВИС" />

        <div className="flex flex-col items-start gap-x-[200px] gap-y-12 md:flex-row md:items-end">
          <div className="flex flex-col gap-8 md:min-h-[689px]">
            <h2 className="text-2xl">Сервис как система</h2>
            <p className="text-base font-normal">
              Собственная Академия Сервиса.
              <br />
              Все сотрудники проходят внутреннюю
              <br />
              подготовку по единым стандартам LOFT HALL.
            </p>
          </div>

          <div className="flex w-full max-w-[632px] flex-col gap-8">
            {ITEMS.map((item, i) => (
              <div key={item.number} className="flex flex-col gap-8">
                {i > 0 && <Divider />}
                <div className="flex items-center gap-24">
                  <span className="text-xl">{item.number}</span>
                  <span className="text-xl">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
