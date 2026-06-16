import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";

const CARDS = [
  {
    image: "/images/decor/decor-1.jpg",
    title: "Посуда и сервировка",
    subtitle: ["Подбираем под формат и визуальную", "концепцию мероприятия"],
  },
  {
    image: "/images/decor/decor-2.jpg",
    title: "Текстиль",
    subtitle: ["Детали оформления, создающие", "цельный образ события."],
  },
  {
    image: "/images/decor/decor-3.jpg",
    title: "Мебель",
    subtitle: ["Фуршетные и банкетные столы,", "барные станции."],
  },
] as const;

export function Decor() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-background py-24">
      <Container className="flex flex-col gap-12">
        <SectionLabel number="06" name="АНТУРАЖ" />
        <h2 className="text-2xl">
          Интерьер / Декор /
          <br />
          Посуда / Текстиль
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="relative flex h-[614px] flex-col overflow-hidden rounded-md py-6 pr-24 pl-6"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative flex w-[320px] flex-col gap-4">
                <h3 className="text-xl">{card.title}</h3>
                <p className="max-w-[282px] text-sm font-normal">
                  {card.subtitle.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
