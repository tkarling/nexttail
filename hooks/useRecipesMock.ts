import { useState, useCallback, useMemo } from "react";
import { Recipe, RecipeContent } from "../types";

export default function useRecipes({
  initialRecipes,
}: {
  initialRecipes: Recipe[];
}) {
  const [data, setData] = useState(() => initialRecipes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const load = useCallback(() => {
    fetch("/api/recipe")
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
    const addRecipe = (recipe: RecipeContent) => {
      setIsLoading(true);
      fetch("/api/recipe", {
        method: "post",
        body: JSON.stringify(recipe),
      })
        .then((res) => res.json())
        .then((data) => {
          load();
        })
        .catch((error) => {
          console.log("Error adding recipe", recipe.name, error);
          setError(`Error adding Recipe: ${error}`);
          setIsLoading(false);
        });
    };

    const deleteRecipe = ({ id }: { id: string }) => {
      setIsLoading(true);
      return fetch("/api/recipe?id=" + id, { method: "delete" })
        .then((res) => res.json())
        .then((data) => {
          load();
        })
        .catch((error) => {
          console.log("Error deleting recipe", id, error);
          setError(`Error deleting Recipe: ${error}`);
          setIsLoading(false);
        });
    };
    return {
      data,
      isLoading,
      error,
      addRecipe,
      deleteRecipe,
    };
  }, [data, error, isLoading, load]);
}
