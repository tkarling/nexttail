import { KeyedMutator } from "swr";
import { Card, Spinner } from "../components/Common";
import { Page } from "../components/Page";
import type { RecipeContent } from "../types/index";
import type { User } from "../pages/api/user";

import AddRecipe from "../components/AddRecipe";
import RecipeCard from "../components/RecipeCard";
import useRecipes from "../hooks/useRecipes";
import useUser from "../lib/useUser";

const RecipePage: React.FC<{
  addRecipe?: (recipe: RecipeContent) => void;
  user?: User;
  mutateUser: KeyedMutator<User>;
}> = ({ children, user, mutateUser }) => (
  <Page user={user} mutateUser={mutateUser}>
    <h1 className="text-xl pb-2">Recipes</h1>
    {children}
  </Page>
);

const Recipes: React.FC = () => {
  const userProps = useUser();
  const { user } = userProps;
  const canEdit = !!user?.isLoggedIn;

  const {
    data: recipes = [],
    isLoading,
    error,
    addRecipe,
    deleteRecipe,
    toggleThisWeek,
  } = useRecipes();

  if (error && !recipes.length) {
    return <RecipePage {...userProps}>Error: {error}</RecipePage>;
  }
  if (isLoading) {
    return (
      <RecipePage {...userProps}>
        <Spinner />
      </RecipePage>
    );
  }

  return (
    <>
      <RecipePage {...userProps}>
        {canEdit && <AddRecipe addRecipe={addRecipe} />}
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            toggleThisWeek={() => toggleThisWeek(recipe)}
            deleteRecipe={() => deleteRecipe(recipe)}
            canEdit={canEdit}
          />
        ))}
        {!recipes.length && (
          <Card>
            <div>You have no Recipes. Please add a Recipe</div>
          </Card>
        )}
        {error && (
          <Card>
            <div className="py-2 text-red-500">Error: {error}</div>
          </Card>
        )}
      </RecipePage>
    </>
  );
};

export default Recipes;
