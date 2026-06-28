import type { Recipe } from "@/lib/types";

export const lemonGarlicSalmon: Recipe = {
  slug: "lemon-garlic-salmon",
  title: "Lemon-Garlic Butter Salmon",
  subtitle: "One pan, twelve minutes, crispy skin",
  tagline: "A twelve-minute, one-pan dinner for one — crispy skin, basted in garlic butter, finished with lemon and herbs. The kind of thing you cook on a Tuesday and feel smug about.",
  hero: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=1600&q=80",
  heroAlt: "Pan-seared salmon fillet with crispy skin basted in garlic butter",
  cuisine: "Mediterranean",
  category: "mains",
  methods: ["stovetop", "oven", "air-fryer"],
  methodOptions: [
    { method: "stovetop", label: "Stovetop", time: "12 min", temp: "med-high", note: "Best: crispy skin" },
    { method: "air-fryer", label: "Air-fryer", time: "10–12 min", temp: "200 °C", note: "Fastest, least mess" },
    { method: "oven", label: "Oven", time: "12 min", temp: "200 °C", note: "Most even cook" },
  ],
  equipment: ["skillet", "knife", "scale"],
  dietTags: ["high-protein", "low-carb", "pescatarian", "gluten-free"],
  difficulty: "easy",
  servings: { base: 1, min: 1, max: 4 },
  timeMin: { active: 12, passive: 2 },
  ingredients: [
    { id: "salmon", name: "Salmon fillet, skin on", everyday: "1 palm-sized fillet", qty: 1, unit: "fillet", gram: 150, group: "protein" },
    { id: "salt", name: "Sea salt & black pepper", everyday: "a generous pinch", gram: null, group: "seasoning" },
    { id: "oil", name: "Olive oil", everyday: "a glug", qty: 1, unit: "tbsp", gram: 15, group: "fat" },
    { id: "butter", name: "Butter, cold", everyday: "a thumb of butter", qty: 1, unit: "tbsp", gram: 15, group: "fat", localProduct: "Woolworths salted butter" },
    { id: "garlic", name: "Garlic, finely grated", everyday: "2 cloves", qty: 2, unit: "clove", gram: 8, group: "aromatic" },
    { id: "lemon", name: "Lemon (zest + juice)", everyday: "½ a lemon", qty: 0.5, unit: "piece", gram: 30, group: "finish" },
    { id: "herbs", name: "Parsley & dill", everyday: "a small handful", qty: 1, unit: "handful", gram: 5, group: "finish" },
  ],
  steps: [
    { id: "s1", instruction: "Pat the salmon bone-dry and season both sides with salt.", method: "prep", calloutIds: ["dry-before-sear", "mise-en-place"] },
    { id: "s2", instruction: "Get the oil shimmering in a skillet over medium-high heat.", method: "stovetop", calloutIds: ["preheat-pan"] },
    { id: "s3", instruction: "Lay it skin-side down, press flat for 10 seconds, then leave it alone for 4 minutes.", method: "stovetop", durationMin: 4, calloutIds: ["dont-crowd-pan", "sear-maillard"] },
    { id: "s4", instruction: "Flip, drop in the butter and garlic, and baste for 1–2 minutes.", method: "stovetop", durationMin: 2, calloutIds: ["garlic-late", "mount-butter"] },
    { id: "s5", instruction: "Off the heat: squeeze over the lemon, then rest the fillet 2 minutes.", method: "rest", durationMin: 2, calloutIds: ["rest-meat", "acid-balances"] },
    { id: "s6", instruction: "Plate skin-side up and scatter with the herbs.", method: "prep", calloutIds: ["delicate-herbs-late"] },
  ],
  nutrition: { energyKJ: 1850, energyKcal: 440, protein_g: 38, carbs_g: 6, fat_g: 30, fibre_g: 1, sugar_g: 1, sodium_mg: 320 },
  pairings: [
    { type: "wine", name: "Sauvignon Blanc", detail: "Crisp and herbal — cuts straight through the butter.", kJ: 520, localPick: "Durbanville Hills Sauvignon Blanc" },
    { type: "mocktail", name: "Cucumber-Mint Spritz", detail: "Zero-proof, bright, almost no kilojoules.", kJ: 80 },
  ],
  sides: [
    { name: "Jasmine rice", kJ: 840, match: 96 },
    { name: "Buttery mash", kJ: 970, match: 91 },
    { name: "Charred asparagus", kJ: 310, match: 88 },
    { name: "Roast baby potatoes", kJ: 760, match: 84 },
  ],
  sources: [
    { name: "Serious Eats — How to Cook Salmon", url: "https://www.seriouseats.com/the-food-lab-how-to-pan-fry-salmon-fillets" },
  ],
};
