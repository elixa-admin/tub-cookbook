// TUB — content loader (server-safe; reads the in-repo recipe registry)

import { recipes } from "@/content/recipes";
import { CALLOUTS } from "@/content/callouts";
import type { Callout, Recipe } from "./types";

export function getAllRecipes(): Recipe[] { return recipes; }

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getCallout(id: string): Callout | undefined { return CALLOUTS[id]; }

export function getCalloutsForRecipe(recipe: Recipe): Record<string, Callout> {
  const out: Record<string, Callout> = {};
  for (const step of recipe.steps) {
    for (const id of step.calloutIds ?? []) {
      const c = CALLOUTS[id];
      if (c) out[id] = c;
    }
  }
  return out;
}
