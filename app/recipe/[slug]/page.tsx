import { notFound } from "next/navigation";
import { getAllRecipes, getCalloutsForRecipe, getRecipe } from "@/lib/content";
import { RecipeView } from "@/components/recipe-view";

export function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();
  const callouts = getCalloutsForRecipe(recipe);
  return <RecipeView recipe={recipe} callouts={callouts} />;
}
