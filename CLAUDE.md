@AGENTS.md

# CATERING

Веб-приложение для кейтеринга.

## Стек

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 4** (CSS-first config в `app/globals.css`)
- **shadcn/ui** (style: new-york, base color: neutral, иконки: lucide)
- **pnpm**

> ⚠️ Next.js 16 содержит breaking changes относительно прежних версий. Перед написанием кода сверяйся с `node_modules/next/dist/docs/` (см. AGENTS.md).

## Архитектура — Feature-Sliced Design (FSD)

Роутинг Next живёт в корневом `/app` (он же выполняет роль FSD-слоя `app`: layout, провайдеры, глобальные стили). Все остальные слои — в `/src`:

```
app/                 # Next App Router: layout, страницы-роуты (композиция виджетов), globals.css
src/
  widgets/           # самостоятельные блоки UI (секции лендинга)
  features/          # пользовательские сценарии (действия)
  entities/          # бизнес-сущности
  shared/            # переиспользуемое, без бизнес-логики
    ui/              # shadcn-компоненты + общий UI-кит
    lib/             # утилиты (cn и т.п.)
    api/             # клиенты/обёртки запросов
    config/          # конфиги, константы
    fonts/           # локальные шрифты (next/font/local)
    hooks/           # общие хуки
```

> Для одностраничного лендинга слой `pages`/`views` не используется — композиция секций живёт прямо в `app/page.tsx`. Если страниц станет несколько, вынеси композиции в `src/views/*` (FSD-слой `pages`, переименован из-за резервирования Next).

### Правила FSD

- Импорт **только сверху вниз**: `app → widgets → features → entities → shared`. Слой не импортирует из слоёв выше или соседних срезов своего уровня.
- Доступ к срезу — только через его публичный API (`index.ts`), не вглубь.
- Алиас `@/*` указывает на `./src/*` (например, `@/shared/lib/utils`). Файлы-роуты в `/app` импортируют из `@/...`.
- Роут `/app/**/page.tsx` композирует виджеты-секции напрямую.

### shadcn/ui

- Конфиг — `components.json`. Компоненты ставятся в `src/shared/ui`.
- Добавление: `pnpm dlx shadcn@latest add <component>`.

## Адаптив

- **Mobile-first**: база = мобильная вёрстка, `md:` (≥768px) = десктоп. Размеры берём строго из соответствующего фрейма Figma (`Landing / Mobile` и `Landing / Desktop`).
- Один виджет = обе вёрстки через Tailwind-брейкпоинты (не дублируем секции). Где раскладки расходятся структурно (Numbers/Service — фуллскрин-фон vs контейнерное фото; Approach — карусель vs сетка; Form — сетка полей vs столбик) — переключаем через `hidden`/`md:flex` и адаптивные классы.
- `Container` (`src/shared/ui`) задаёт гаттеры: 16px моб / 80px десктоп, max-w 1280 по центру.

## Изображения

- Мастер-исходники — в `public/images/<секция>/` (jpg для фото, svg для лого/иконок/декора). Раскладка по папкам-секциям.
- Отдаёт и оптимизирует `next/image` (AVIF+webp, адаптивные размеры) — конфиг в `next.config.ts` (`formats`, `qualities: [75,85,90]`; в Next 16 `qualities` обязателен). Крупным фото ставим `quality={85}`; SVG — `unoptimized`.
- Не пережимать вручную в webp заранее (двойное сжатие). Скрипты конвертации/ресайза/кропа — в `scripts/` (`to-webp`, `resize-jpg`, `crop-jpg`).
- Часть ассетов Figma не отдаёт через MCP-export (плейсхолдер) — тогда берём скриншотом нода (`get_screenshot`) и кропим.

## Команды

- `pnpm dev` — дев-сервер
- `pnpm build` — прод-сборка
- `pnpm lint` — ESLint

## Git

- **НИКОГДА** не добавлять `Co-Authored-By: Claude` или любую другую подпись/упоминание AI-ассистента в commit message. Коммиты — от имени пользователя.
