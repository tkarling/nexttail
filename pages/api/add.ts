// @ts-expect-error no types
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { addRecipe } from "./load";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send("recipe content required.");
  }
  const recipe = JSON.parse(req.body);
  const newRecipe = { ...recipe, id: uuidv4() };
  addRecipe(newRecipe);

  return Promise.resolve(newRecipe).then((data) => {
    let result = JSON.stringify(data);
    return res.status(200).json(result);
  });

  //   let todo = encodeURI(req.query.todo);

  //   const token = "REPLACE_YOUR_TOKEN";
  //   const url =
  //     "https://REPLACE_YOUR_ENDPOINT/lpush/todo/" + todo + "?_token=" + token;

  //   return fetch(url)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       let result = JSON.stringify(data.result);
  //       return res.status(200).json(result);
  //     });
};
