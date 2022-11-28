import { useMemo } from "react";
import useSWR from "swr";
import fetchJson from "../lib/fetchJson";
import { Recipe, RecipeContent } from "../types";

const END_POINT = "api/recipe";

export default function useRecipes() {
  const { data, error, mutate } = useSWR<Recipe[]>(END_POINT, fetchJson);

  return useMemo(() => {
    const addRecipe = async (recipe: RecipeContent) => {
      try {
        mutate(
          await fetchJson(END_POINT, {
            method: "post",
            body: JSON.stringify(recipe),
          })
        );
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    };

    const deleteRecipe = async (recipe: Recipe) => {
      try {
        mutate(
          await fetchJson(END_POINT, {
            method: "delete",
            body: JSON.stringify(recipe),
          })
        );
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    };

    const updateRecipe = async (recipe: Recipe) => {
      try {
        mutate(
          await fetchJson(END_POINT, {
            method: "put",
            body: JSON.stringify(recipe),
          })
        );
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    };

    const toggleThisWeek = (recipe: Recipe) => {
      updateRecipe({ ...recipe, thisWeek: !recipe.thisWeek });
    };

    return {
      data,
      error,
      addRecipe,
      deleteRecipe,
      toggleThisWeek,
    };
  }, [data, error, mutate]);
}
