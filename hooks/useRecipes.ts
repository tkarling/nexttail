import { useEffect, useState } from "react";
import { RecipeContent, Recipe } from "../pages/api/types";

// interface RecipeContent {
//     name: string;
//     url: string;
// }

// interface Recipe extends RecipeContent{
//     id: string;
//   }

export default function useRecipes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");

  //   let add = (recipe: RecipeContent) => {
  //     setLoading(true);
  //     fetch("/api/add?recipe=" + recipe.name)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         load();
  //       });
  //   };

  //   let remove = (recipe: Recipe) => {
  //     setLoading(true);
  //     fetch("/api/remove?recipe=" + recipe.id)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         load();
  //       });
  //   };

  let load = () => {
    console.log("load todos");
    fetch("/api/load")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("effect");
    setLoading(true);
    load();
  }, []);

  return {
    data,
    loading,
    // add,
    // remove,
  };
}
