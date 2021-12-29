import { Page, PageTitle, Card, Spinner, Button } from "../components/Common";
import AddRecipe from "../components/AddRecipe";
import useRecipes from "../hooks/useRecipes";

const Recipes: React.FC<void> = () =>
  // { recipes = [] }: Props
  {
    const {
      data: recipes = [],
      isLoading,
      addRecipe,
      deleteRecipe,
    } = useRecipes();

    return (
      <Page>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <PageTitle>Add Recipe</PageTitle>
            <AddRecipe addRecipe={addRecipe} />
            <PageTitle>Recipes</PageTitle>
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
          </>
        )}
      </Page>
    );
  };

// export const getStaticProps = async () => {
//   const { data: recipes } = await Promise.resolve({ data: myRecipes });

//   return {
//     props: {
//       recipes,
//     },
//   };
// };

export default Recipes;
