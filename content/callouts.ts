// TUB — the "why it works" callout library (cooking-science verified). Referenced by recipe steps.

import type { Callout } from "@/lib/types";

export const CALLOUTS: Record<string, Callout> = {
  "dry-before-sear": { id: "dry-before-sear", category: "technique", title: "Pat it bone-dry first", body: "Surface moisture turns to steam and kills the crust. Dry skin or meat equals a crispy, deeply browned result." },
  "preheat-pan": { id: "preheat-pan", category: "technique", title: "Get the pan properly hot", body: "A shimmering-hot pan sears on contact and stops protein sticking — that's the Leidenfrost water-bead effect at work." },
  "dont-crowd-pan": { id: "dont-crowd-pan", category: "technique", title: "Don't crowd the pan", body: "Overfilling drops the pan temperature — you'll steam instead of sear. Leave space, or work in batches." },
  "garlic-late": { id: "garlic-late", category: "science", title: "Garlic goes in late", body: "Onions need 10 to 15 minutes to soften; garlic burns in one or two and turns bitter. Always alliums first, garlic last." },
  "sear-maillard": { id: "sear-maillard", category: "science", title: "Sear for flavour, not to seal in juices", body: "High heat triggers the Maillard reaction — amino acids and sugars combine into hundreds of new flavour compounds. The 'seals in juices' story is a myth." },
  "rest-meat": { id: "rest-meat", category: "technique", title: "Let it rest", body: "Resting lets relaxed muscle fibres reabsorb their juices. Cut into it immediately and they pool on the board, not in the bite.", source: { name: "Serious Eats — Meat Resting" } },
  "delicate-herbs-late": { id: "delicate-herbs-late", category: "technique", title: "Delicate herbs at the end", body: "Rosemary, thyme and bay release slowly and survive heat; basil, coriander, parsley and dill die fast — add them off the heat." },
  "acid-balances": { id: "acid-balances", category: "science", title: "Finish with acid", body: "A squeeze of lemon or splash of vinegar cuts through fat and brightens a heavy dish — one of Samin Nosrat's four elements.", source: { name: "Samin Nosrat — Salt Fat Acid Heat" } },
  "salt-pasta-water": { id: "salt-pasta-water", category: "science", title: "Salt the pasta water like the sea", body: "Pasta absorbs roughly 1.5 times its weight in water as it cooks — salting seasons it from the inside out, not just the surface." },
  "dont-rinse-pasta": { id: "dont-rinse-pasta", category: "technique", title: "Never rinse cooked pasta", body: "Surface starch is what lets sauce emulsify and cling. Reserve a splash of pasta water — it's liquid gold for a silky sauce." },
  "mise-en-place": { id: "mise-en-place", category: "tip", title: "Mise en place", body: "Prep every ingredient before you turn on the heat. No mid-recipe scrambling, lower stress, better technique." },
  "airfryer-vs-oven": { id: "airfryer-vs-oven", category: "tip", title: "Air-fryer for small, oven for large", body: "Rapid circulating heat crisps small portions fast; the oven gives gentle, even cooking for bigger batches." },
  "salt-in-layers": { id: "salt-in-layers", category: "tip", title: "Salt in layers", body: "Season at prep, during the cook, and at the end. Layered salting builds depth that a single pinch never can." },
  "deglaze-fond": { id: "deglaze-fond", category: "technique", title: "Deglaze the fond", body: "Those sticky brown bits are pure flavour. Splash in wine or stock, scrape, and reduce while the meat rests — instant pan sauce." },
  "mount-butter": { id: "mount-butter", category: "technique", title: "Mount with cold butter", body: "Off the heat, swirl in cold butter to emulsify a sauce into something velvety. Melted butter alone will split." },
  "toast-spices": { id: "toast-spices", category: "technique", title: "Toast your spices", body: "Dry-toasting whole spices in a pan releases their essential oils — dramatically more flavour than using them raw." },
  "temp-meat-even": { id: "temp-meat-even", category: "technique", title: "Take the chill off", body: "30 to 60 minutes out of the fridge shrinks the temperature gradient for a more even cook (stay within the 2-hour food-safety window)." },
  "baking-soda-onions": { id: "baking-soda-onions", category: "tip", title: "A pinch of baking soda for onions", body: "Raising the pH accelerates the Maillard reaction — caramelised onions in about 20 minutes instead of 45. Use sparingly." },
};
