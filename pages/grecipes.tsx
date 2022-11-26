// pages/index.js
import type { NextApiRequest, NextApiResponse } from "next";
import { API, withSSRContext } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

import { listRecipeNTS } from "../src/graphql/queries";
import { createRecipeNT, deleteRecipeNT } from "../src/graphql/mutations";

import { PageTitle, Card, Spinner, Button } from "../components/Common";
import { Page } from "../components/Page";
import { Recipe, RecipeContent } from "../types/index";
import AddRecipe from "../components/AddRecipe";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  let recipes = [];
  const SSR = withSSRContext({ req });
  try {
    const response = await SSR.API.graphql({ query: listRecipeNTS });
    recipes = response.data.listRecipeNTS.items
      .filter((item: any) => !item._deleted)
      .map((item: any) => {
        const { id, name, url, _version } = item;
        return { id, name, url, _version };
      });
    console.log(
      "🚀 ~ file: grecipes.tsx ~ line 16 ~ getServerSideProps ~ recipes",
      recipes
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: grecipes.tsx ~ line 22 ~ getServerSideProps ~ error",
      error
    );
  }

  return {
    props: {
      recipes,
    },
  };
}

async function addRecipe(recipeContent: RecipeContent) {
  try {
    const { data } = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: createRecipeNT,
      variables: {
        input: {
          ...recipeContent,
        },
      },
    });

    window.location.href = `/grecipes`;
  } catch ({ errors }) {
    console.error(errors);
    // throw new Error(errors[0].message);
  }
}

async function deleteRecipe(recipe: Recipe) {
  try {
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

    window.location.href = `/grecipes`;
  } catch ({ errors }) {
    console.error(errors);
    // throw new Error(errors[0].message);
  }
}

interface Props {
  recipes: Recipe[];
}

const RecipePage: React.FC<{ addRecipe?: (recipe: RecipeContent) => void }> = ({
  children,
  addRecipe = () => {},
}) => (
  <Page>
    <PageTitle>Add Recipe</PageTitle>
    <AddRecipe addRecipe={addRecipe} />
    <PageTitle>Recipes</PageTitle>
    {children}
  </Page>
);

// const addRecipe = () => {};
// const deleteRecipe = ({ recipe }: Recipe) => {};

const Recipes: React.FC<Props> = ({ recipes: initialRecipes = [] }) => {
  //   const {
  //     data: recipes = [],
  //     isLoading,
  //     error,
  //     addRecipe,
  //     deleteRecipe,
  //   } = useRecipes({ initialRecipes });

  //   if (error) {
  //     return <RecipePage>Error: {error}</RecipePage>;
  //   }
  //   if (isLoading) {
  //     return (
  //       <RecipePage>
  //         <Spinner />
  //       </RecipePage>
  //     );
  //   }

  const recipes = initialRecipes;

  return (
    <Authenticator>
      {() => (
        <RecipePage addRecipe={addRecipe}>
          {recipes.map((recipe) => {
            const { id, name, url } = recipe;
            return (
              <Card key={id}>
                <div className="w-full flex justify-between">
                  <a href={url} target="_blank" rel="noreferrer">
                    <h2 className="capitalize">{name}</h2>
                    {/* <p>Find in-depth information about Next.js features and API.</p> */}
                  </a>
                  <Button onClick={() => deleteRecipe(recipe)} isDelete>
                    x
                  </Button>
                </div>
              </Card>
            );
          })}
          {!recipes.length && (
            <Card>
              <div>You have no Recipes. Please add a Recipe</div>
            </Card>
          )}
        </RecipePage>
      )}
    </Authenticator>
  );
};

export default Recipes;
