"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Flame, Clock, Users, Search, Plus, Minus, Check, Wine, Info,
  Sparkles, Leaf, Utensils, Fish,
} from "lucide-react";
import type { Callout, Recipe } from "@/lib/types";
import { scaleRecipe } from "@/lib/scaling";
import { displayQty, fmtQty, fmtInt } from "@/lib/units";

export function RecipeView({ recipe, callouts }: { recipe: Recipe; callouts: Record<string, Callout> }) {
  const [servings, setServings] = useState(recipe.servings.base);
  const [anal, setAnal] = useState(false);
  const [methodId, setMethodId] = useState(recipe.methodOptions[0]?.method);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [openWhy, setOpenWhy] = useState<string | null>(null);

  const scaled = useMemo(() => scaleRecipe(recipe, servings), [recipe, servings]);
  const macroTotal = scaled.nutrition.protein_g + scaled.nutrition.carbs_g + scaled.nutrition.fat_g || 1;
  const activeMethod = recipe.methodOptions.find((m) => m.method === methodId) ?? recipe.methodOptions[0];
  const min = recipe.servings.min;
  const max = recipe.servings.max;

  const toggle = (id: string) =>
    setChecked((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const stepUp = (d: number) =>
    setServings((s) => Math.min(max, Math.max(min, +(s + d).toFixed(1))));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-background"><Flame className="h-4 w-4" /></span>
            <span className="font-display text-xl font-semibold tracking-tight">TUB<span className="text-muted">.</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
            <Link href="/" className="transition hover:text-foreground">Discover</Link>
            <Link href="/" className="transition hover:text-foreground">Recipes</Link>
            <Link href="/" className="transition hover:text-foreground">Pantry</Link>
            <Link href="/" className="transition hover:text-foreground">Pairings</Link>
          </nav>
          <button className="grid h-9 w-9 place-items-center rounded-full border text-muted transition hover:text-foreground"><Search className="h-4 w-4" /></button>
        </div>
      </header>

      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 ember-glow" />
        <img src={recipe.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            <span>{recipe.category}</span>
            <span className="text-muted/60">·</span>
            <span className="text-muted">{recipe.cuisine}</span>
            <span className="text-muted/60">·</span>
            <span className="text-muted">{recipe.difficulty}</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance md:text-7xl">{recipe.title}</h1>
          {recipe.tagline && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{recipe.tagline}</p>}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Meta icon={<Clock className="h-4 w-4" />} label={`${recipe.timeMin.active} min`} />
            <Meta icon={<Users className="h-4 w-4" />} label={`${fmtQty(servings)} serving${servings > 1 ? "s" : ""}`} />
            <Meta icon={<Flame className="h-4 w-4" />} label={`${scaled.nutrition.energyKJ} kJ`} />
            <Meta icon={<Fish className="h-4 w-4" />} label={activeMethod?.label ?? ""} />
            {recipe.dietTags.includes("high-protein") && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-success"><Check className="h-3.5 w-3.5" /> High protein</span>
            )}
          </div>
        </div>
      </section>

      <section className="border-b bg-surface/40">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-5 py-3">
          {recipe.methodOptions.map((mm) => (
            <button key={mm.method} onClick={() => setMethodId(mm.method)}
              className={"flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition " + (methodId === mm.method ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted hover:text-foreground")}>
              <span className="font-medium">{mm.label}</span>
              <span className="text-muted/70">·</span>
              <span className="measure text-muted">{mm.temp}</span>
              <span className="text-muted/70">·</span>
              <span className="measure text-muted">{mm.time}</span>
            </button>
          ))}
          {activeMethod?.note && <span className="ml-auto hidden text-xs text-muted sm:block">{activeMethod.note}</span>}
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-12 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold">Ingredients</h2>
                <p className="text-xs text-muted">Scaled to your serving</p>
              </div>
              <button onClick={() => setAnal(!anal)}
                className={"rounded-full border px-3 py-1.5 text-xs font-medium transition " + (anal ? "border-primary bg-primary/15 text-primary" : "border-border text-muted hover:text-foreground")}>
                {anal ? "grams" : "everyday"}
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border bg-surface p-2">
              <button onClick={() => stepUp(-0.5)} disabled={servings <= min} className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 transition hover:bg-primary/20 disabled:opacity-40"><Minus className="h-4 w-4" /></button>
              <div className="text-center">
                <div className="measure font-display text-2xl font-semibold leading-none">{fmtQty(servings)}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted">serving{servings > 1 ? "s" : ""}</div>
              </div>
              <button onClick={() => stepUp(0.5)} disabled={servings >= max} className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 transition hover:bg-primary/20 disabled:opacity-40"><Plus className="h-4 w-4" /></button>
            </div>

            <ul className="space-y-1">
              {scaled.ingredients.map((ing) => {
                const on = checked.has(ing.id);
                const m = displayQty(ing);
                const primary = anal ? m.precise : m.relatable;
                const secondary = anal ? m.relatable : m.precise;
                const note = [ing.localProduct ? "SA: " + ing.localProduct : "", ...ing.notes].filter(Boolean).join("  ");
                return (
                  <li key={ing.id}>
                    <button onClick={() => toggle(ing.id)} className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition hover:bg-surface">
                      <span className={"grid h-5 w-5 shrink-0 place-items-center rounded-md border transition " + (on ? "border-success bg-success text-background" : "border-border text-transparent")}><Check className="h-3.5 w-3.5" /></span>
                      <span className="flex-1">
                        <span className={"block text-sm " + (on ? "text-muted line-through" : "text-foreground")}>{ing.name}{ing.optional && <span className="ml-1 text-[10px] uppercase text-muted/60">opt</span>}</span>
                        {note && <span className="mt-0.5 block text-[11px] text-primary/80">{note}</span>}
                      </span>
                      <span className="measure shrink-0 text-right text-xs">
                        <span className={anal ? "font-medium text-primary" : "text-muted"}>{primary}</span>
                        <span className="mx-1.5 text-muted/40">|</span>
                        <span className="text-muted/70">{secondary}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="rounded-2xl border bg-surface p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xs font-medium uppercase tracking-widest text-muted">Nutrition</h3>
                <span className="text-[10px] text-muted">per portion</span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="measure font-display text-5xl font-semibold leading-none text-primary">{fmtInt(scaled.nutrition.energyKJ)}</span>
                <span className="mb-1 text-sm text-muted">kJ</span>
              </div>
              <div className="measure mt-1 text-xs text-muted">≈ {scaled.nutrition.energyKcal} kcal</div>
              <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-surface-2">
                <div style={{ width: (scaled.nutrition.protein_g / macroTotal * 100) + "%" }} className="bg-primary" />
                <div style={{ width: (scaled.nutrition.carbs_g / macroTotal * 100) + "%" }} className="bg-success" />
                <div style={{ width: (scaled.nutrition.fat_g / macroTotal * 100) + "%" }} className="bg-accent" />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <Macro label="Protein" v={`${scaled.nutrition.protein_g} g`} c="text-primary" />
                <Macro label="Carbs" v={`${scaled.nutrition.carbs_g} g`} c="text-success" />
                <Macro label="Fat" v={`${scaled.nutrition.fat_g} g`} c="text-accent" />
              </div>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">The Method</h2>
            <span className="text-xs text-muted">{activeMethod?.label} · {activeMethod?.temp}</span>
          </div>
          <ol className="space-y-3">
            {recipe.steps.map((s, i) => {
              const stepCallouts = (s.calloutIds ?? []).map((id) => callouts[id]).filter(Boolean);
              return (
                <li key={s.id} className="rounded-2xl border bg-surface/60 p-5 transition hover:bg-surface">
                  <div className="flex gap-4">
                    <span className="measure grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 font-medium text-primary">{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-[15px] leading-relaxed text-foreground">{s.instruction}</p>
                      {stepCallouts.map((c) => {
                        const isOpen = openWhy === c.id;
                        return (
                          <div key={c.id}>
                            <button onClick={() => setOpenWhy(isOpen ? null : c.id)} className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs text-primary transition hover:bg-primary/10">
                              <Info className="h-3.5 w-3.5" />
                              <span className="font-medium">Why?</span>
                              <span className="text-primary/60">— {c.title}</span>
                            </button>
                            {isOpen && <p className="mt-3 border-l-2 border-primary/40 pl-4 font-display text-sm italic leading-relaxed text-muted">{c.body}</p>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {recipe.pairings && recipe.pairings.length > 0 && (
            <div className="mt-10 rounded-2xl border bg-gradient-to-br from-surface to-background p-6">
              <div className="flex items-center gap-2 text-primary"><Sparkles className="h-4 w-4" /><h3 className="font-display text-xl font-semibold">Pair it with</h3></div>
              <p className="mt-1 text-sm text-muted">Drinks that match this dish — kilojoules noted, so the count stays honest.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {recipe.pairings.map((p) => (
                  <div key={p.name} className="rounded-xl border bg-surface/70 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-muted">{p.type}</span>
                      {p.kJ != null && <span className="measure text-xs text-muted">{p.kJ} kJ</span>}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      {p.type === "wine" ? <Wine className="h-4 w-4 text-primary" /> : <Leaf className="h-4 w-4 text-success" />}
                      <span className="font-medium">{p.name}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted">{p.detail}</p>
                    {p.localPick && <p className="mt-1 text-[11px] text-primary/80">SA pick: {p.localPick}</p>}
                  </div>
                ))}
              </div>
              {recipe.sides && recipe.sides.length > 0 && (
                <>
                  <div className="mt-5 flex items-center gap-2 text-muted"><Utensils className="h-4 w-4" /><span className="text-xs font-medium uppercase tracking-widest">Serve it with — consensus</span></div>
                  <div className="mt-2 space-y-1.5">
                    {recipe.sides.map((sd) => (
                      <div key={sd.name} className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-surface">
                        <span className="flex-1 text-sm">{sd.name}</span>
                        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-2"><span className="block h-full bg-primary" style={{ width: sd.match + "%" }} /></span>
                        <span className="measure w-8 text-right text-xs text-muted">{sd.match}%</span>
                        <span className="measure w-16 text-right text-xs text-muted">{sd.kJ} kJ</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-8 text-xs text-muted">TUB · The Ultimate Bachelor's Cookbook</div>
      </footer>
    </div>
  );
}

function Meta({ icon, label }: { icon: ReactNode; label: string }) {
  return (<span className="inline-flex items-center gap-2 text-muted"><span className="text-primary">{icon}</span>{label}</span>);
}
function Macro({ label, v, c }: { label: string; v: string; c: string }) {
  return (<div><div className={"measure text-lg font-semibold " + c}>{v}</div><div className="text-[10px] uppercase tracking-widest text-muted">{label}</div></div>);
}
