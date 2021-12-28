import type { NextPage } from "next";
import Link from "next/link";
import { Page, PageTitle, Card } from "../components/Common";
import useRecipes from "../hooks/useRecipes";

// interface Recipe {
//   id: string;
//   name: string;
//   url: string;
// }

// interface Props {
//   recipies: Recipe[];
// }
const Recipies: React.FC<void> = () =>
  // { recipies = [] }: Props
  {
    const { data: recipies = [], loading } = useRecipes();
    return (
      <Page>
        <PageTitle>Recipies</PageTitle>
        {recipies.map((recipe) => {
          const { id, name, url } = recipe;
          return (
            <Card key={name}>
              <a href={url} target="_blank">
                <h2>{name}</h2>
                {/* <p>Find in-depth information about Next.js features and API.</p> */}
              </a>
            </Card>
          );
        })}
      </Page>
    );
  };

// const myRecipies: Recipe[] = [
//   {
//     id: "1",
//     name: "Instant Pot Oatmeal Recipe for Steel Cut Oats or Rolled Oats",
//     url: "https://www.foodiecrush.com/instant-pot-oatmeal-recipe-steel-cut-oats-rolled-oats/",
//   },
//   {
//     id: "2",
//     name: "Gourmet Mushroom Risotto",
//     url: "https://www.allrecipes.com/recipe/85389/gourmet-mushroom-risotto/",
//   },
// ];

// export const getStaticProps = async () => {
//   const { data: recipies } = await Promise.resolve({ data: myRecipies });

//   return {
//     props: {
//       recipies,
//     },
//   };
// };

export default Recipies;
