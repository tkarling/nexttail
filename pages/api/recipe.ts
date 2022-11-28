// https://upstash.com/blog/survey-serverless-redis
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
// @ts-expect-error no types
import { v4 as uuidv4 } from "uuid";

import { Recipe } from "../../types";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
} as any);
const KEY = "myRecipes";

const FILE_NAME = "demo.json";
// let savedRecipes: Recipe[];
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

const readRecipes = async () => {
  try {
    const data: Recipe[] = (await redis.get(KEY)) || [];
    return data || [];
  } catch (err: any) {
    if (!err?.message?.includes?.("no such file or directory")) {
      console.error("Error reading recipes", err);
    }
    return [];
  }
};

const saveRecipes = (mrecipes: Recipe[]) => {
  const recipes = sortRecipes(mrecipes);
  try {
    redis.set(KEY, JSON.stringify(recipes));
  } catch (err) {
    console.error("Error writing recipes", err);
  }
  return recipes;
};

export const loadRecipes = async () => sortRecipes(await readRecipes());

const addRecipe = async (newRecipe: Recipe) => {
  const myRecipes = await readRecipes();
  const updatedRecipes = [
    ...myRecipes,
    { ...newRecipe, name: newRecipe.name.toLowerCase(), thisWeek: true },
  ];
  return await saveRecipes(updatedRecipes);
};

const deleteRecipe = async (recipeId: string) => {
  const myRecipes = await readRecipes();
  const updatedRecipes = myRecipes.filter((recipe) => recipe.id !== recipeId);
  return await saveRecipes(updatedRecipes);
};

const updateRecipe = async (newRecipe: Recipe) => {
  const myRecipes = await readRecipes();
  const updatedRecipes = myRecipes.map((recipe) =>
    recipe.id !== newRecipe.id ? recipe : newRecipe
  );
  return await saveRecipes(updatedRecipes);
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

export default withIronSessionApiRoute(recipeRoute, sessionOptions);

// eslint-disable-next-line import/no-anonymous-default-export
async function recipeRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return loadRecipes().then((data) => {
      return res.status(200).json(data);
    });
  }

  if (req.method === "PUT") {
    if (!req.body) {
      res.status(400).send("recipe to be updated required");
    }
    const recipe = JSON.parse(req.body);

    return updateRecipe(recipe).then((data) => {
      return res.status(200).json(data);
    });
  }

  if (req.method === "POST") {
    if (!req.body) {
      return res.status(400).send("recipe content required");
    }
    if (!req.session?.user?.isLoggedIn) {
      return res.status(400).send({ message: "log in to add recipe" });
    }
    const recipe = JSON.parse(req.body);
    const newRecipe = { ...recipe, id: uuidv4(), _version: 1 };

    return addRecipe(newRecipe).then((data) => {
      return res.status(200).json(data);
    });
  }

  if (req.method === "DELETE") {
    if (!req.body) {
      return res.status(400).send("recipe to be deleted required");
    }
    if (!req.session?.user?.isLoggedIn) {
      return res.status(400).send({ message: "log in to delete recipe" });
    }
    const recipe = JSON.parse(req.body);

    return deleteRecipe(recipe.id).then((data) => {
      return res.status(200).json(data);
    });
  }

  res.status(404).send("Unknown method");
}
