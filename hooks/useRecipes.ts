import { useEffect, useState, useCallback, useMemo } from "react";
import { RecipeContent } from "../types";

export default function useRecipes() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(() => {
    fetch("/api/load")
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
    const add = (recipe: RecipeContent) => {
      setIsLoading(true);
      fetch("/api/add", {
        method: "post",
        body: JSON.stringify(recipe),
      })
        .then((res) => res.json())
        .then((data) => {
          load();
        });
    };

    const remove = (recipe: { id: string }) => {
      setIsLoading(true);
      fetch("/api/remove?recipe=" + recipe.id)
        .then((res) => res.json())
        .then((data) => {
          load();
        });
    };
    return {
      data,
      isLoading,
      add,
      remove,
    };
  }, [data, isLoading, load]);
}
