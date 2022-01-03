import type { NextApiRequest, NextApiResponse } from "next";
import { withSSRContext } from "aws-amplify";

import { listRecipeNTS } from "../../src/graphql/queries";
import {
  createRecipeNT,
  deleteRecipeNT,
  updateRecipeNT,
} from "../../src/graphql/mutations";

import { Recipe, RecipeContent } from "../../types";

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

export const loadRecipes = async ({ req }: { req: NextApiRequest }) => {
  const SSR = withSSRContext({ req });
  const response = await SSR.API.graphql({ query: listRecipeNTS });

  const _recipes = response.data.listRecipeNTS.items
    .filter((item: any) => !item._deleted)
    .map((item: any) => {
      const { id, name, url, thisWeek, tags, _version } = item;
      return { id, name, url, thisWeek, tags, _version };
    });
  const recipes = sortRecipes(_recipes);

  return {
    recipes,
  };
};

async function addRecipe(API: any, recipeContent: RecipeContent) {
  const { data: newRecipe } = await API.graphql({
    authMode: "AMAZON_COGNITO_USER_POOLS",
    query: createRecipeNT,
    variables: {
      input: {
        ...recipeContent,
      },
    },
  });
  return { newRecipe };
}

async function deleteRecipe(API: any, recipe: Recipe) {
  const { data } = await API.graphql({
    authMode: "AMAZON_COGNITO_USER_POOLS",
    query: deleteRecipeNT,
    variables: {
      input: {
        id: recipe.id,
        _version: recipe._version,
      },
    },
  });
  return {};
}

async function updateRecipe(API: any, recipe: Recipe) {
  const { data: newRecipe } = await API.graphql({
    authMode: "AMAZON_COGNITO_USER_POOLS",
    query: updateRecipeNT,
    variables: {
      input: {
        ...recipe,
      },
    },
  });
  return { recipe };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { Auth, API } = withSSRContext({ req });
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
    const recipeContent = JSON.parse(req.body);
    try {
      const { newRecipe } = await addRecipe(API, recipeContent);
      return res.status(200).json(newRecipe);
    } catch (error) {
      console.log("Error adding recipe", error);
      res.status(400).send(error);
    }
  }

  if (req.method === "GET") {
    try {
      const { recipes } = await loadRecipes({ req });
      return res.status(200).json(recipes);
    } catch (error) {
      console.log("Error loading recipes", error);
      res.status(400).send(error);
    }
  }

  if (req.method === "DELETE") {
    if (!req.body) {
      res.status(400).send("recipe to be deleted required");
    }

    const recipe = JSON.parse(req.body);
    try {
      const { data } = await deleteRecipe(API, recipe);
      return res.status(200).json({});
    } catch (error) {
      console.log("Error deleting recipe", error);
      res.status(400).send(error);
    }
  }

  if (req.method === "PUT") {
    if (!req.body) {
      res.status(400).send("recipe to be updated required");
    }

    const recipe = JSON.parse(req.body);
    try {
      updateRecipe(API, recipe);
      return res.status(200).json(recipe);
    } catch (error) {
      console.log("Error deleting recipe", error);
      res.status(400).send(error);
    }
  }

  res.status(404).send("Unknown method");
};
