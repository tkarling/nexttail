// import { Authenticator } from "@aws-amplify/ui-react";
import { Page, Card, Spinner, Button } from "../components/Common";
import { Recipe, RecipeContent } from "../types/index";
import { loadRecipes as loadFsRecipes } from "./api/recipe";
// import { loadRecipes } from "./api/grecipe";
import AddRecipe from "../components/AddRecipe";
import RecipeCard from "../components/RecipeCard";
import useRecipes from "../hooks/useRecipes";
import { NextApiRequest } from "next";
import { useState } from "react";

interface Props {
  recipes: Recipe[];
}

const RecipePage: React.FC<{ addRecipe?: (recipe: RecipeContent) => void }> = ({
  children,
}) => (
  <Page>
    <h1 className="text-xl pb-2">Recipes</h1>
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
  const [addOpen, setAddOpen] = useState(false);

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
    <>
      {/* {() => ( */}
      <RecipePage>
        {addOpen ? (
          <AddRecipe addRecipe={addRecipe} onClose={() => setAddOpen(false)} />
        ) : (
          <div className="py-2">
            <Button onClick={() => setAddOpen(true)}>Add</Button>
          </div>
        )}
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            toggleThisWeek={() => toggleThisWeek(recipe)}
            deleteRecipe={() => deleteRecipe(recipe)}
          />
        ))}
        {!recipes.length && (
          <Card>
            <div>You have no Recipes. Please add a Recipe</div>
          </Card>
        )}
      </RecipePage>
      {/* )} */}
    </>
  );
};

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const recipes = loadFsRecipes();
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
