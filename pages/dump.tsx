import { NextApiRequest } from "next";
import { Card } from "../components/Common";
import { Page } from "../components/Page";
import { Recipe } from "../types/index";
import { loadRecipes as loadFsRecipes } from "./api/recipe";

interface Props {
  recipes: Recipe[];
}

const Recipes: React.FC<Props> = ({ recipes = [] }) => {
  return (
    <>
      <Page>
        <h1 className="text-xl pb-2">Recipes</h1>
        <div className="text-sm">
          <pre>{JSON.stringify(recipes, null, 2)}</pre>
        </div>
        {!recipes.length && (
          <Card>
            <div>You have no Recipes. Please add a Recipe</div>
          </Card>
        )}
      </Page>
    </>
  );
};

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const recipes = loadFsRecipes();
  return { props: { recipes } };
};

export default Recipes;
