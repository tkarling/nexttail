import type { NextPage } from "next";
import Link from "next/link";

interface Recipe {
  id: string;
  name: string;
  url: string;
}

interface Props {
  recipies: Recipe[];
}
const Recipies: React.FC<Props> = ({ recipies = [] }: Props) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      <h1>Recipies</h1>
      {recipies.map((recipe) => {
        const { id, name, url } = recipe;
        return (
          <div className="p-8 h-40 mb-4 rounded shadow text-xl flex" key={name}>
            <a href={url} target="_blank">
              <h2>{name}</h2>
              {/* <p>Find in-depth information about Next.js features and API.</p> */}
            </a>
          </div>
        );
      })}
    </div>
  );
};

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

export const getStaticProps = async () => {
  const { data: recipies } = await Promise.resolve({ data: myRecipies });

  return {
    props: {
      recipies,
    },
  };
};

export default Recipies;
