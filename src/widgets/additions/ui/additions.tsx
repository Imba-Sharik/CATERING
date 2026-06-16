import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Divider } from "@/shared/ui/divider";

const ITEMS = [
  {
    icon: "/images/additions/add-1.svg",
    iconClass: "h-8 w-[39px] md:h-[46px] md:w-[55px]",
    iconW: 55,
    iconH: 46,
    number: "01",
    title: "Анимационные станции",
    descA: "Приготовление блюд перед гостями.",
    descB: "Живое взаимодействие",
  },
  {
    icon: "/images/additions/add-2.svg",
    iconClass: "size-7 md:size-[46px]",
    iconW: 46,
    iconH: 46,
    number: "02",
    title: "Бар и миксология",
    descA: "100+ концепций от классики",
    descB: "до авторской миксологии",
  },
  {
    icon: "/images/additions/add-3.svg",
    iconClass: "h-7 w-5 md:h-[53px] md:w-9",
    iconW: 36,
    iconH: 53,
    number: "03",
    title: "Кальяны",
    descA: "Премиальный кальянный сервис",
    descB: "на ведущих брендах",
  },
  {
    icon: "/images/additions/add-4.svg",
    iconClass: "h-[21px] w-7 md:h-[45px] md:w-[58px]",
    iconW: 58,
    iconH: 45,
    number: "04",
    title: "Мастер-классы",
    descA: "Кулинарные, барные, кальянные —",
    descB: "как часть сценария события",
  },
] as const;

export function Additions() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-background py-14 md:py-24">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 md:gap-12">
          <SectionLabel number="04" name="ДОПОЛНЕНИЯ К ГАСТРОНОМИИ" />
          <h2 className="max-w-[649px] text-xl md:text-2xl">
            Впечатления через гастрономию и сервис
          </h2>
        </div>

        <div className="flex flex-col gap-4 md:gap-12">
          <Divider />
          {ITEMS.map((item) => (
            <div key={item.number} className="flex flex-col gap-4 md:gap-12">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
                  <Image
                    src={item.icon}
                    alt=""
                    width={item.iconW}
                    height={item.iconH}
                    unoptimized
                    className={`shrink-0 ${item.iconClass}`}
                  />
                  <div className="flex items-center gap-3 md:contents">
                    <span className="text-lg md:text-xl">{item.number}</span>
                    <span className="text-lg md:text-xl">{item.title}</span>
                  </div>
                </div>
                <p className="max-w-[170px] text-xs font-normal md:max-w-none md:text-sm">
                  {item.descA}
                  <br className="hidden md:inline" /> {item.descB}
                </p>
              </div>
              <Divider />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
