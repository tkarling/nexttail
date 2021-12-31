import { Authenticator } from "@aws-amplify/ui-react";
import { Page, PageTitle, Card, Spinner, Button } from "../components/Common";
import { Recipe, RecipeContent } from "../types/index";
import { loadRecipes } from "./api/recipe";
import AddRecipe from "../components/AddRecipe";
import useRecipes from "../hooks/useRecipes";

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

export const getServerSideProps = async () => {
  const { data: recipes } = await Promise.resolve({ data: loadRecipes() });

  return {
    props: {
      recipes,
    },
  };
};

export default Recipes;
