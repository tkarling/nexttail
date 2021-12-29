import { Page, PageTitle, Card, Spinner } from "../components/Common";
import AddRecipe from "../components/AddRecipe";
import useRecipes from "../hooks/useRecipes";

const Recipes: React.FC<void> = () =>
  // { recipes = [] }: Props
  {
    const { data: recipes = [], isLoading, add } = useRecipes();

    return (
      <Page>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <PageTitle>Add Recipe</PageTitle>
            <AddRecipe add={add} />
            <PageTitle>Recipes</PageTitle>
            {recipes.map((recipe) => {
              const { id, name, url } = recipe;
              return (
                <Card key={id}>
                  <a href={url} target="_blank" rel="noreferrer">
                    <h2 className="capitalize">{name}</h2>
                    {/* <p>Find in-depth information about Next.js features and API.</p> */}
                  </a>
                </Card>
              );
            })}
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
