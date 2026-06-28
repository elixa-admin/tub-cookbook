// TUB — unit + measurement formatting. Three registers: precise (g), volume (tsp/cup), everyday.

import type { ScaledIngredient } from "./scaling";

const FRACTIONS: Record<number, string> = {
  0.125: "⅛", 0.25: "¼", 0.333: "⅓", 0.5: "½", 0.667: "⅔", 0.75: "¾",
  1.5: "1½", 2.5: "2½", 3.5: "3½",
};

export function fmtQty(n: number): string {
  if (n <= 0) return "0";
  const key = Number(n.toFixed(3));
  if (FRACTIONS[key]) return FRACTIONS[key];
  if (Number.isInteger(n)) return String(n);
  return (Math.round(n * 100) / 100).toString();
}

const PLURAL: Record<string, string> = {
  clove: "cloves", fillet: "fillets", slice: "slices", leaf: "leaves",
  piece: "pieces", handful: "handfuls", pinch: "pinches", stick: "sticks",
};

export function pluralize(unit: string, qty: number): string {
  if (qty === 1) return unit;
  return PLURAL[unit] ?? (unit + "s");
}

export interface MeasureDisplay { relatable: string; precise: string; }

export function displayQty(ing: ScaledIngredient): MeasureDisplay {
  const precise = ing.gram == null ? "to taste" : (ing.scaledGram + " g");
  const volume = ing.qty != null && ing.unit
    ? (fmtQty(ing.scaledQty) + " " + pluralize(ing.unit, ing.scaledQty))
    : "";
  const relatable = ing.everyday && ing.everyday.trim() ? ing.everyday : volume;
  return { relatable: relatable || precise, precise };
}

export function cToF(c: number): number { return Math.round((c * 9) / 5 + 32); }

export function fmtInt(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
