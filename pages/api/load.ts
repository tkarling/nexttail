import { Recipe } from "./types";

const myRecipies: Recipe[] = [
  {
    id: "1",
    name: "Instant Pot Oatmeal Recipe for Steel Cut Oats or Rolled Oats",
    url: "https://www.foodiecrush.com/instant-pot-oatmeal-recipe-steel-cut-oats-rolled-oats/",
  },
  {
    id: "2",
    name: "Gourmet Mushroom Risotto",
    url: "https://www.allrecipes.com/recipe/85389/gourmet-mushroom-risotto/",
  },
];

export default async (req: any, res: any) => {
  return Promise.resolve(myRecipies).then((data) => {
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
