import { Button } from "@/shared/ui/button";

export function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold tracking-tight">CATERING</h1>
      <p className="text-muted-foreground">
        Next.js 16 · React 19 · Tailwind 4 · shadcn/ui · FSD
      </p>
      <Button>Начать</Button>
    </main>
  );
}
