import Link from "next/link";
import { getAllRecipes } from "@/lib/content";
import { Flame, Clock, Search } from "lucide-react";

export default function Home() {
  const recipes = getAllRecipes();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-background"><Flame className="h-4 w-4" /></span>
            <span className="font-display text-xl font-semibold tracking-tight">TUB<span className="text-muted">.</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
            <a className="transition hover:text-foreground">Discover</a>
            <a className="transition hover:text-foreground">Recipes</a>
            <a className="transition hover:text-foreground">Pantry</a>
            <a className="transition hover:text-foreground">Pairings</a>
          </nav>
          <button className="grid h-9 w-9 place-items-center rounded-full border text-muted transition hover:text-foreground"><Search className="h-4 w-4" /></button>
        </div>
      </header>

      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 ember-glow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-32">
          <div className="text-xs font-medium uppercase tracking-[0.25em] text-primary">The Ultimate Bachelor&apos;s Cookbook</div>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance md:text-8xl">
            Cook for one,<br /><span className="text-primary">like you mean it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Every recipe scaled to a single serving. Full nutrition in kilojoules. The <span className="font-medium text-foreground">why</span> on every step — and it starts with what&apos;s already in your fridge.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/recipe/${recipes[0]?.slug ?? "lemon-garlic-salmon"}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-background transition hover:opacity-90">
              See a recipe <span aria-hidden>→</span>
            </Link>
            <button className="inline-flex h-11 items-center rounded-full border px-6 text-sm font-medium text-muted transition hover:text-foreground">What&apos;s in my fridge?</button>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
            <Stat k="kJ-first" v="nutrition" />
            <Stat k="grams · everyday" v="measures" />
            <Stat k="stovetop · oven · air-fryer" v="methods" />
            <Stat k="why it works" v="on every step" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold">Recipes</h2>
          <span className="text-xs text-muted">{recipes.length} and counting</span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <Link key={r.slug} href={`/recipe/${r.slug}`} className="group overflow-hidden rounded-2xl border bg-surface transition hover:border-primary/40">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={r.heroThumb ?? r.hero} alt={r.heroAlt} className="h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted backdrop-blur">{r.cuisine}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold leading-tight">{r.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{r.tagline}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {r.timeMin.active} min</span>
                  <span className="inline-flex items-center gap-1.5"><Flame className="h-3.5 w-3.5" /> {r.nutrition.energyKJ} kJ</span>
                  <span className="ml-auto">{r.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-10 text-xs text-muted">TUB · The Ultimate Bachelor&apos;s Cookbook — built for the solo cook.</div>
      </footer>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="measure font-medium text-foreground">{k}</span>
      <span className="text-muted/70">{v}</span>
    </span>
  );
}
