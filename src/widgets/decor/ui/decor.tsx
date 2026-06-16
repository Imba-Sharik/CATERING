import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";

const CARDS = [
  {
    image: "/images/decor/decor-1.jpg",
    title: "Посуда и сервировка",
    subtitle: "Подбираем под формат и визуальную концепцию мероприятия",
  },
  {
    image: "/images/decor/decor-2.jpg",
    title: "Текстиль",
    subtitle: "Детали оформления, создающие цельный образ события",
  },
  {
    image: "/images/decor/decor-3.jpg",
    title: "Мебель",
    subtitle: "Фуршетные и банкетные столы, барные станции",
  },
] as const;

export function Decor() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-background py-14 md:py-24">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 md:gap-12">
          <SectionLabel number="06" name="АНТУРАЖ" />
          <h2 className="text-xl md:text-2xl">
            Интерьер / Декор /
            <br className="hidden md:inline" /> Посуда / Текстиль
          </h2>
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="relative h-[180px] overflow-hidden rounded-md p-4 md:h-[614px] md:py-6 md:pr-24 md:pl-6"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative flex w-full flex-col gap-2 md:w-[320px] md:gap-4">
                <h3 className="text-lg md:text-xl">{card.title}</h3>
                <p className="text-xs font-normal md:max-w-[282px] md:text-sm">
                  {card.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
