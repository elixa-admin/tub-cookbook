// TUB — scaling engine. Pure functions: recipe + servings -> scaled ingredients & nutrition.

import type { IngredientLine, Nutrition, Recipe, ScalingRule } from "./types";

export function scaleQty(rule: ScalingRule | undefined, baseQty: number, multiplier: number): number {
  const r = rule ?? { kind: "linear" };
  switch (r.kind) {
    case "tapered": // spices / salt / leavening don't scale linearly — taper above 1x
      return baseQty * (1 + (multiplier - 1) * 0.8);
    case "linear":
    default:
      return baseQty * multiplier;
  }
}

export interface ScaledIngredient extends IngredientLine {
  scaledQty: number;
  scaledGram: number | null;
  tapered: boolean;
  notes: string[];
}

export function scaleIngredient(ing: IngredientLine, multiplier: number): ScaledIngredient {
  const rule = ing.scaling ?? { kind: "linear" };
  const scaledQty = ing.qty != null ? scaleQty(rule, ing.qty, multiplier) : 0;
  const scaledGram = ing.gram != null ? Math.round(ing.gram * multiplier) : null;
  const tapered = rule.kind === "tapered" && multiplier > 1.0001;

  const notes: string[] = [];
  if (ing.scaling?.kind === "egg" && scaledQty % 1 !== 0 && scaledQty < 1.5) {
    notes.push("Use 2 eggs, reserve half for tomorrow's breakfast.");
  }
  if (tapered) notes.push("Tapered — season to taste (spices don't scale linearly).");
  if (ing.substitutes && ing.substitutes.length) {
    notes.push("Sub: " + ing.substitutes.map((s) => s.name).join(" / "));
  }

  return { ...ing, scaledQty, scaledGram, tapered, notes };
}

export function scaleNutrition(n: Nutrition, multiplier: number): Nutrition {
  const r = (x?: number) => (x == null ? undefined : Math.round(x * multiplier));
  return {
    energyKJ: Math.round(n.energyKJ * multiplier),
    energyKcal: Math.round(n.energyKcal * multiplier),
    protein_g: Math.round(n.protein_g * multiplier),
    carbs_g: Math.round(n.carbs_g * multiplier),
    fat_g: Math.round(n.fat_g * multiplier),
    fibre_g: r(n.fibre_g),
    sugar_g: r(n.sugar_g),
    sodium_mg: r(n.sodium_mg),
  };
}

export interface ScaledRecipe {
  multiplier: number;
  ingredients: ScaledIngredient[];
  nutrition: Nutrition;
}

export function scaleRecipe(recipe: Recipe, servings: number): ScaledRecipe {
  const multiplier = servings / recipe.servings.base;
  return {
    multiplier,
    ingredients: recipe.ingredients.map((i) => scaleIngredient(i, multiplier)),
    nutrition: scaleNutrition(recipe.nutrition, multiplier),
  };
}
