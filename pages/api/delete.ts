import type { NextApiRequest, NextApiResponse } from "next";
import { deleteRecipe } from "./load";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.recipe || typeof req.query.recipe !== "string") {
    return res.status(400).send("recipe id required for deleting.");
  }
  const recipeId = encodeURI(req.query.recipe);

  deleteRecipe(recipeId);

  return Promise.resolve(recipeId).then((data) => {
    let result = JSON.stringify(data);
    return res.status(200).json(result);
  });

  //   const token = "REPLACE_YOUR_TOKEN";
  //   const url =
  //     "https://REPLACE_YOUR_ENDPOINT/lrem/todo/1/" + todo + "?_token=" + token;

  //   return fetch(url)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       let result = JSON.stringify(data.result);
  //       return res.status(200).json(result);
  //     });
};
