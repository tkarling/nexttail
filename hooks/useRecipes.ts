import { useState, useCallback, useMemo } from "react";
import { Recipe, RecipeContent } from "../types";

const END_POINT = "api/recipe";

export default function useRecipes({
  initialRecipes,
}: {
  initialRecipes: Recipe[];
}) {
  const [data, setData] = useState(() => initialRecipes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const load = useCallback(() => {
    fetch(END_POINT)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setError(undefined);
      })
      .catch((error) => {
        setError(`Error loading Recipes: ${error}`);
      });
  }, []);

  return useMemo(() => {
    const addRecipe = async (recipe: RecipeContent) => {
      setIsLoading(true);
      try {
        const response = await fetch(END_POINT, {
          method: "post",
          body: JSON.stringify(recipe),
        });
        if (!response.ok) {
          throw response;
        }
        await load();
      } catch (response) {
        const error = await (response as any).json();
        const message = `Error adding Recipe ${recipe.name}: ${error.message}`;
        console.log(message);
        setError(message);
        setIsLoading(false);
      }
    };

    const deleteRecipe = async (recipe: Recipe) => {
      setIsLoading(true);
      try {
        const response = await fetch(END_POINT, {
          method: "delete",
          body: JSON.stringify(recipe),
        });
        if (!response.ok) {
          throw response;
        }
        await load();
      } catch (response) {
        const error = await (response as any).json();
        const message = `Error deleting Recipe ${recipe.name}: ${error.message}`;
        console.log(message);
        setError(message);
        setIsLoading(false);
      }
    };

    const updateRecipe = async (recipe: Recipe) => {
      setIsLoading(true);
      try {
        const response = await fetch(END_POINT, {
          method: "put",
          body: JSON.stringify(recipe),
        });
        if (!response.ok) {
          throw response;
        }
        await load();
      } catch (response) {
        const error = await (response as any).json();
        const message = `Error deleting Recipe ${recipe.name}: ${error.message}`;
        console.log(message);
        setError(message);
        setIsLoading(false);
      }
    };

    const toggleThisWeek = (recipe: Recipe) => {
      updateRecipe({ ...recipe, thisWeek: !recipe.thisWeek });
    };

    return {
      data,
      isLoading,
      error,
      addRecipe,
      deleteRecipe,
      toggleThisWeek,
    };
  }, [data, error, isLoading, load]);
}
