import { Authenticator } from "@aws-amplify/ui-react";
import { Page, PageTitle, Card, Spinner, Button } from "../components/Common";
import { Recipe, RecipeContent } from "../types/index";
import { loadRecipes as loadMockRecipes } from "./api/recipe";
import { loadRecipes } from "./api/grecipe";
import AddRecipe from "../components/AddRecipe";
import useRecipes from "../hooks/useRecipes";
import { NextApiRequest } from "next";

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

const Recipes: React.FC<Props> = ({ recipes: initialRecipes = [] }) => {
  const {
    data: recipes = [],
    isLoading,
    error,
    addRecipe,
    deleteRecipe,
  } = useRecipes({ initialRecipes });
  console.log("🚀 ~ file: recipes.tsx ~ line 29 ~ recipes", recipes);

  if (error) {
    return <RecipePage>Error: {error}</RecipePage>;
  }
  if (isLoading) {
    return (
      <RecipePage>
        <Spinner />
      </RecipePage>
    );
  }

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

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const { recipes } = await Promise.resolve({ recipes: loadMockRecipes() });
  return { props: { recipes } };

  // try {
  //   const { recipes = [] } = await loadRecipes({ req });
  //   return { props: { recipes } };
  // } catch (error) {
  //   console.log("Error loading recipes", error);
  //   return { props: {} };
  // }
};

export default Recipes;
