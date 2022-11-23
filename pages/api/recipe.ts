import type { NextApiRequest, NextApiResponse } from "next";
import { withSSRContext } from "aws-amplify";
// @ts-expect-error no types
import { v4 as uuidv4 } from "uuid";

import { Recipe } from "../../types";

const fs = require("fs");

const FILE_NAME = "demo.json";
let savedRecipes: Recipe[];
//  = [
//   {
//     id: "1",
//     name: "instant pot oatmeal",
//     url: "https://www.foodiecrush.com/instant-pot-oatmeal-recipe-steel-cut-oats-rolled-oats/",
//     _version: 1,
//     thisWeek: true,
//   },
//   {
//     id: "2",
//     name: "Gourmet Mushroom Risotto",
//     url: "https://www.allrecipes.com/recipe/85389/gourmet-mushroom-risotto/",
//     _version: 1,
//     tags: "breakfast",
//   },
// ];

const readRecipes = () => {
  if (savedRecipes) {
    return savedRecipes;
  }
  try {
    const data = fs.readFileSync(FILE_NAME, { encoding: "utf8", flag: "r" });
    savedRecipes = data ? JSON.parse(data) : [];
  } catch (err) {
    console.log("Error reading recipes", err);
  }
  return savedRecipes;
};

const saveRecipes = (recipes: Recipe[]) => {
  savedRecipes = recipes;
  try {
    fs.writeFileSync(FILE_NAME, JSON.stringify(recipes));
  } catch (err) {
    console.log("Error writing recipes", err);
  }
};

export const loadRecipes = () => readRecipes();

const addRecipe = (newRecipe: Recipe) => {
  const myRecipes = readRecipes();
  const updatedRecipes = [
    ...myRecipes,
    { ...newRecipe, name: newRecipe.name.toLowerCase() },
  ];
  saveRecipes(updatedRecipes);
};

const deleteRecipe = (recipeId: string) => {
  const myRecipes = readRecipes();
  const updatedRecipes = myRecipes.filter((recipe) => recipe.id !== recipeId);
  saveRecipes(updatedRecipes);
};

const updateRecipe = (newRecipe: Recipe) => {
  const myRecipes = readRecipes();
  const updatedRecipes = myRecipes.map((recipe) =>
    recipe.id !== newRecipe.id ? recipe : newRecipe
  );
  saveRecipes(updatedRecipes);
};

const sortRecipes = (recipes: Recipe[]) =>
  recipes.sort((a, b) => {
    if (a.thisWeek && !b.thisWeek) {
      return -1;
    }
    if (b.thisWeek && !a.thisWeek) {
      return 1;
    }
    return a.name < b.name ? -1 : 1;
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const { Auth } = withSSRContext({ req });
  // try {
  //   const user = await Auth.currentAuthenticatedUser();
  // } catch (error) {
  //   console.log("Error authenticating:", error);
  //   res.status(400).send(error);
  // }

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
    return Promise.resolve(sortRecipes(readRecipes())).then((data) => {
      return res.status(200).json(data);
    });
  }

  if (req.method === "DELETE") {
    console.log("🚀 ~ file: recipe.ts ~ line 128 ~ method", req.method);

    if (!req.body) {
      res.status(400).send("recipe to be deleted required");
    }
    const recipe = JSON.parse(req.body);

    deleteRecipe(recipe.id);

    return Promise.resolve().then(() => {
      return res.status(200).json({});
    });
  }

  if (req.method === "PUT") {
    if (!req.body) {
      res.status(400).send("recipe to be updated required");
    }
    const recipe = JSON.parse(req.body);

    updateRecipe(recipe);

    return Promise.resolve().then(() => {
      return res.status(200).json(recipe);
    });
  }

  res.status(404).send("Unknown method");
};
