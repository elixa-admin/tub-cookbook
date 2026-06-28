// TUB — core domain types. Scaling, units, nutrition, callouts & pairings live here.

export type Method = "stovetop" | "oven" | "air-fryer" | "grill" | "prep" | "rest";
export type Equipment =
  | "stovetop" | "oven" | "air-fryer" | "grill"
  | "skillet" | "saucepan" | "sheet-pan" | "pot" | "knife" | "scale";

export type DietTag =
  | "high-protein" | "low-carb" | "keto" | "mediterranean"
  | "gluten-free" | "vegetarian" | "pescatarian" | "dairy-free";

export type Unit =
  | "g" | "kg" | "ml" | "l"
  | "tsp" | "tbsp" | "cup"
  | "oz" | "lb" | "fl oz"
  | "clove" | "pinch" | "piece" | "handful" | "fillet" | "slice" | "leaf" | "stick" | "stalk";

export type ScalingRule =
  | { kind: "linear" }
  | { kind: "tapered"; category: "spice" | "salt" | "leavening" }
  | { kind: "egg" };

export type Register = "precise" | "volume" | "everyday";

export interface Substitute { name: string; note?: string; likelyOnHand?: boolean; }

export interface IngredientLine {
  id: string;
  name: string;
  everyday?: string;
  qty?: number;
  unit?: Unit;
  gram?: number | null;
  defaultRegister?: Register;
  scaling?: ScalingRule;
  prep?: string;
  optional?: boolean;
  localProduct?: string;
  substitutes?: Substitute[];
  group?: "protein" | "aromatic" | "fat" | "produce" | "pantry" | "dairy" | "finish" | "seasoning";
}

export type CalloutCategory = "technique" | "science" | "substitution" | "safety" | "tip";

export interface Callout {
  id: string;
  category: CalloutCategory;
  title: string;
  body: string;
  source?: { name: string; url?: string };
}

export interface RecipeStep {
  id: string;
  instruction: string;
  method?: Method;
  durationMin?: number;
  tempC?: number;
  calloutIds?: string[];
}

export interface MethodOption {
  method: Method;
  label: string;
  time: string;
  temp?: string;
  note?: string;
}

export interface Nutrition {
  energyKJ: number;
  energyKcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fibre_g?: number;
  sugar_g?: number;
  sodium_mg?: number;
}

export type PairingType = "wine" | "cocktail" | "mocktail" | "whiskey" | "beer";

export interface Pairing {
  type: PairingType;
  name: string;
  detail: string;
  kJ?: number;
  localPick?: string;
}

export interface SideOption { name: string; kJ: number; match: number; }

export interface Recipe {
  slug: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  hero: string;
  heroAlt: string;
  heroThumb?: string;
  cuisine: string;
  category: "mains" | "pasta" | "bowls" | "breakfast" | "sides" | "dessert";
  methods: Method[];
  methodOptions: MethodOption[];
  equipment: Equipment[];
  dietTags: DietTag[];
  difficulty: "easy" | "intermediate" | "advanced";
  servings: { base: number; min: number; max: number };
  timeMin: { active: number; passive: number };
  ingredients: IngredientLine[];
  steps: RecipeStep[];
  nutrition: Nutrition;
  pairings?: Pairing[];
  sides?: SideOption[];
  sources?: { name: string; url: string }[];
  panHints?: Record<number, string>;
}
