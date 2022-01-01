import type { NextApiRequest, NextApiResponse } from "next";
import { withSSRContext } from "aws-amplify";
// @ts-expect-error no types
import { v4 as uuidv4 } from "uuid";

import { Recipe } from "../../types";

let myRecipes: Recipe[] = [
  {
    id: "1",
    name: "instant pot oatmeal",
    url: "https://www.foodiecrush.com/instant-pot-oatmeal-recipe-steel-cut-oats-rolled-oats/",
    _version: 1,
  },
  {
    id: "2",
    name: "Gourmet Mushroom Risotto",
    url: "https://www.allrecipes.com/recipe/85389/gourmet-mushroom-risotto/",
    _version: 1,
  },
];

export const loadRecipes = () => myRecipes;

const addRecipe = (newRecipe: Recipe) => {
  myRecipes = [
    ...myRecipes,
    { ...newRecipe, name: newRecipe.name.toLowerCase() },
  ];
};

const deleteRecipe = (recipeId: string) => {
  myRecipes = myRecipes.filter((recipe) => recipe.id !== recipeId);
};

const sortRecipes = (recipes: Recipe[]) =>
  recipes.sort((a, b) => (a.name < b.name ? -1 : 1));

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
  } catch (error) {
    console.log("Error authenticating:", error);
    res.status(400).send(error);
  }

  if (req.method === "POST") {
    if (!req.body) {
      res.status(400).send("recipe content required");
    }
    const recipe = JSON.parse(req.body);
    const newRecipe = { ...recipe, id: uuidv4(), _version: 1 };
    addRecipe(newRecipe);

    return Promise.resolve(newRecipe).then((data) => {
      return res.status(200).json(data);
    });
  }

  if (req.method === "GET") {
    return Promise.resolve(sortRecipes(myRecipes)).then((data) => {
      return res.status(200).json(data);
    });
  }

  if (req.method === "DELETE") {
    if (!req.body) {
      res.status(400).send("recipe to be deleted required");
    }
    const recipe = JSON.parse(req.body);

    deleteRecipe(recipe.id);

    return Promise.resolve().then(() => {
      return res.status(200).json({});
    });
  }

  res.status(404).send("Unknown method");
};
