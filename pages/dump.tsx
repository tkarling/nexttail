import { Card } from "../components/Common";
import { Page } from "../components/Page";
import useRecipes from "../hooks/useRecipes";
import { Recipe } from "../types/index";

interface Props {
  recipes: Recipe[];
}

const Recipes: React.FC<Props> = () => {
  const { data: recipes = [] } = useRecipes();

  return (
    <>
      <Page>
        <h1 className="text-xl pb-2">Recipes</h1>
        {!!recipes.length && (
          <div className="text-sm">
            <pre>{JSON.stringify(recipes, null, 2)}</pre>
          </div>
        )}
        {!recipes.length && (
          <Card>
            <div>You have no Recipes.</div>
          </Card>
        )}
      </Page>
    </>
  );
};

export default Recipes;
