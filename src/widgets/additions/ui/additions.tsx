import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Divider } from "@/shared/ui/divider";

const ITEMS = [
  {
    icon: "/images/add-1.svg",
    w: 55,
    h: 46,
    number: "01",
    title: "Анимационные станции",
    desc: ["Приготовление блюд перед гостями.", "Живое взаимодействие"],
  },
  {
    icon: "/images/add-2.svg",
    w: 46,
    h: 46,
    number: "02",
    title: "Бар и миксология",
    desc: ["100+ концепций от классики", "до авторской миксологии"],
  },
  {
    icon: "/images/add-3.svg",
    w: 36,
    h: 53,
    number: "03",
    title: "Кальяны",
    desc: ["Премиальный кальянный сервис", "на ведущих брендах"],
  },
  {
    icon: "/images/add-4.svg",
    w: 58,
    h: 45,
    number: "04",
    title: "Мастер-классы",
    desc: ["Кулинарные, барные, кальянные —", "как часть сценария события"],
  },
] as const;

export function Additions() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-background py-24">
      <Container className="flex flex-col gap-12">
        <SectionLabel number="04" name="ДОПОЛНЕНИЯ К ГАСТРОНОМИИ" />
        <h2 className="max-w-[649px] text-2xl">
          Впечатления через гастрономию и сервис
        </h2>

        <div className="flex flex-col gap-12">
          <Divider />
          {ITEMS.map((item) => (
            <div key={item.number} className="flex flex-col gap-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-12">
                  <Image
                    src={item.icon}
                    alt=""
                    width={item.w}
                    height={item.h}
                    unoptimized
                    className="shrink-0"
                    style={{ width: item.w, height: item.h }}
                  />
                  <span className="text-xl">{item.number}</span>
                  <span className="text-xl">{item.title}</span>
                </div>
                <p className="text-sm font-normal whitespace-nowrap">
                  {item.desc.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
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
