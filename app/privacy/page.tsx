import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { SiteFooter } from "@/widgets/site-footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — CATERING by Loft Hall",
  description:
    "Политика обработки персональных данных пользователей сайта CATERING by Loft Hall.",
  robots: { index: false, follow: true },
};

const UPDATED = "17 июня 2026 г.";

const SECTIONS = [
  {
    title: "1. Общие положения",
    body: [
      "Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сайта (далее — «Сайт»), которые обрабатывает LOFT HALL (далее — «Оператор»).",
      "Используя Сайт и оставляя свои данные через формы обратной связи, пользователь подтверждает согласие с условиями настоящей Политики. Если пользователь не согласен с её условиями, он должен воздержаться от использования Сайта.",
      "Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».",
    ],
  },
  {
    title: "2. Какие данные мы собираем",
    body: [
      "Оператор обрабатывает персональные данные, которые пользователь предоставляет добровольно при заполнении форм на Сайте:",
    ],
    list: [
      "имя;",
      "номер телефона;",
      "адрес электронной почты;",
      "дата события, количество гостей, формат мероприятия и иные сведения, указанные в комментарии к заявке.",
    ],
    after: [
      "Автоматически Оператор может собирать технические данные: IP-адрес, сведения о браузере и устройстве, данные cookie-файлов, статистику действий на Сайте.",
    ],
  },
  {
    title: "3. Цели обработки",
    body: ["Персональные данные обрабатываются в следующих целях:"],
    list: [
      "обработка заявок и обратная связь с пользователем;",
      "подготовка и направление коммерческих предложений и расчётов стоимости;",
      "исполнение заключённых договоров на оказание услуг кейтеринга;",
      "улучшение работы Сайта и качества обслуживания.",
    ],
  },
  {
    title: "4. Правовые основания обработки",
    body: [
      "Обработка персональных данных осуществляется на основании согласия пользователя, а также для исполнения договора, стороной которого является пользователь, и в соответствии с требованиями применимого законодательства.",
    ],
  },
  {
    title: "5. Передача данных третьим лицам",
    body: [
      "Оператор не передаёт персональные данные третьим лицам, за исключением случаев, прямо предусмотренных законодательством, а также привлечения подрядчиков, обеспечивающих оказание услуг (например, провайдеров хостинга и сервисов аналитики), при условии соблюдения ими конфиденциальности.",
    ],
  },
  {
    title: "6. Сроки хранения",
    body: [
      "Персональные данные хранятся не дольше, чем этого требуют цели обработки, либо до отзыва пользователем согласия на обработку. После достижения целей данные удаляются или обезличиваются.",
    ],
  },
  {
    title: "7. Права пользователя",
    body: ["Пользователь вправе:"],
    list: [
      "получать информацию об обработке своих персональных данных;",
      "требовать уточнения, блокирования или удаления данных;",
      "отозвать согласие на обработку, направив запрос на контактный адрес Оператора.",
    ],
  },
  {
    title: "8. Файлы cookie",
    body: [
      "Сайт использует файлы cookie для корректной работы и анализа посещаемости. Пользователь может отключить cookie в настройках браузера, однако это может повлиять на работу отдельных функций Сайта.",
    ],
  },
  {
    title: "9. Изменения Политики",
    body: [
      "Оператор вправе изменять настоящую Политику. Актуальная редакция всегда доступна на данной странице. Дата последнего обновления указана в начале документа.",
    ],
  },
  {
    title: "10. Контакты",
    body: [
      "По вопросам обработки персональных данных вы можете связаться с Оператором:",
    ],
    list: ["E-mail: info@lofthall.ru", "Телефон: +7 (966) 195-02-25", "Адрес: ул. Ленинская Слобода, 26с 15, Москва"],
  },
] as const;

export default function PrivacyPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      {/* Минимальный хедер: логотип на главную */}
      <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-border bg-background px-6 py-2.5 lg:py-2 lg:px-[clamp(1.5rem,9.62vw_-_4.66rem,4rem)]">
        <Link href="/" className="flex items-center gap-[22px]">
          <Image
            src="/images/hero/logomark.svg"
            alt="Catering by Loft Hall"
            width={41}
            height={26}
            unoptimized
            className="h-[20px] w-[27px] lg:h-[26px] lg:w-[41px]"
          />
          <span className="text-xs whitespace-nowrap lg:text-sm">
            Catering by Loft Hall
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs whitespace-nowrap text-foreground/90 underline-offset-4 transition-colors hover:text-foreground hover:underline lg:text-sm"
        >
          На главную
        </Link>
      </header>

      <Container className="flex flex-col gap-10 py-section md:gap-14">
        <div className="flex flex-col gap-4">
          <h1 className="text-h2">Политика конфиденциальности</h1>
          <p className="text-xs font-normal text-muted-foreground md:text-sm">
            Обновлено: {UPDATED}
          </p>
        </div>

        <div className="flex max-w-[820px] flex-col gap-10">
          {SECTIONS.map((section) => (
            <section key={section.title} className="flex flex-col gap-4">
              <h2 className="text-h3">{section.title}</h2>
              {section.body.map((p) => (
                <p key={p} className="text-body font-normal text-foreground/90">
                  {p}
                </p>
              ))}
              {"list" in section && section.list && (
                <ul className="flex list-disc flex-col gap-2 pl-5 text-body font-normal text-foreground/90">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {"after" in section &&
                section.after?.map((p) => (
                  <p
                    key={p}
                    className="text-body font-normal text-foreground/90"
                  >
                    {p}
                  </p>
                ))}
            </section>
          ))}
        </div>
      </Container>

      <SiteFooter />
    </main>
  );
}
