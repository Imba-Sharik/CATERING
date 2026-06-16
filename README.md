# CATERING

Веб-приложение для кейтеринга.

## Стек

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Feature-Sliced Design.

## Разработка

```bash
pnpm install
pnpm dev
```

- `pnpm dev` — дев-сервер
- `pnpm build` — прод-сборка
- `pnpm lint` — ESLint

## Архитектура

FSD. Роутинг Next — в `/app`, слои — в `/src` (`views`, `widgets`, `features`, `entities`, `shared`). Подробнее — в [CLAUDE.md](./CLAUDE.md).
