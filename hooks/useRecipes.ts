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
    const addRecipe = (recipe: RecipeContent) => {
      setIsLoading(true);
      fetch(END_POINT, {
        method: "post",
        body: JSON.stringify(recipe),
      })
        // .then((res) => res.json())
        .then((data) => {
          load();
        })
        .catch((error) => {
          console.log("Error adding recipe", recipe.name, error);
          setError(`Error adding Recipe: ${error}`);
          setIsLoading(false);
        });
    };

    const deleteRecipe = (recipe: Recipe) => {
      setIsLoading(true);
      return (
        fetch(END_POINT, {
          method: "delete",
          body: JSON.stringify(recipe),
        })
          // .then((res) => res.json())
          .then((data) => {
            load();
          })
          .catch((error) => {
            console.log("Error deleting recipe", recipe.id, error);
            setError(`Error deleting Recipe: ${error}`);
            setIsLoading(false);
          })
      );
    };

    const updateRecipe = (recipe: Recipe) => {
      setIsLoading(true);
      return (
        fetch(END_POINT, {
          method: "put",
          body: JSON.stringify(recipe),
        })
          // .then((res) => res.json())
          .then((data) => {
            load();
          })
          .catch((error) => {
            console.log("Error updating recipe", recipe.id, error);
            setError(`Error updating Recipe: ${error}`);
            setIsLoading(false);
          })
      );
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
