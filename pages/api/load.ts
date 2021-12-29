import { Recipe } from "../../types";

export let myRecipes: Recipe[] = [
  {
    id: "1",
    name: "instant pot oatmeal",
    url: "https://www.foodiecrush.com/instant-pot-oatmeal-recipe-steel-cut-oats-rolled-oats/",
  },
  {
    id: "2",
    name: "Gourmet Mushroom Risotto",
    url: "https://www.allrecipes.com/recipe/85389/gourmet-mushroom-risotto/",
  },
];

export const addRecipe = (newRecipe: Recipe) => {
  myRecipes = [
    ...myRecipes,
    { ...newRecipe, name: newRecipe.name.toLowerCase() },
  ];
};

const sortRecipes = (recipes: Recipe[]) =>
  recipes.sort((a, b) => (a.name < b.name ? -1 : 1));

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  return Promise.resolve(sortRecipes(myRecipes)).then((data) => {
    let result = JSON.stringify(data);
    return res.status(200).json(result);
  });

  // const token = "REPLACE_YOUR_TOKEN";
  // const url = "https://REPLACE_YOUR_ENDPOINT/lrange/todo/0/100?_token=" + token;
  // return fetch(url)
  //     .then(r => r.json())
  //     .then(data => {
  //         let result = JSON.stringify(data.result)
  //         return res.status(200).json(result)
  //     })
};
