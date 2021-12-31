import { useEffect, useState, useCallback, useMemo } from "react";
import { RecipeContent } from "../types";

export default function useRecipes() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(() => {
    fetch("/api/recipe")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    load();
  }, [load]);

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
          setIsLoading(false);
        });
    };
    return {
      data,
      isLoading,
      addRecipe,
      deleteRecipe,
    };
  }, [data, isLoading, load]);
}
