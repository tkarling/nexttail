import { Authenticator } from "@aws-amplify/ui-react";
import {
  Page,
  PageTitle,
  Card,
  Spinner,
  Button,
  Checkbox,
} from "../components/Common";
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
    toggleThisWeek,
  } = useRecipes({ initialRecipes });

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
            const { id, name, url, thisWeek, tags } = recipe;
            return (
              <Card key={id}>
                <div className="w-full flex justify-between">
                  <div className="flex-1 flex gap-4 content-center">
                    <div className="form-check">
                      <Checkbox
                        checked={thisWeek}
                        onChange={() => toggleThisWeek(recipe)}
                      />
                    </div>
                    <div>
                      <a href={url} target="_blank" rel="noreferrer">
                        <h2 className="capitalize">{name}</h2>
                        <div className="text-sm text-indigo-500">{tags}</div>
                      </a>
                    </div>
                  </div>
                  <div>
                    <Button onClick={() => deleteRecipe(recipe)} isDelete>
                      x
                    </Button>
                  </div>
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
