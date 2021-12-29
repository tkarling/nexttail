import { useState } from "react";
import {
  Page,
  PageTitle,
  Card,
  Spinner,
  Button,
  Input,
  ErrorMessage,
} from "../components/Common";
import useRecipes from "../hooks/useRecipes";
import { RecipeContent } from "./api/types";

const AddRecipe = ({ add }: { add: (recipe: RecipeContent) => void }) => {
  const [inputs, setInputs] = useState<Partial<RecipeContent>>({});
  const [error, setError] = useState<Error | null>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (inputs.name && inputs.url) {
      add(inputs as RecipeContent);
      setInputs({});
      setError(null);
    } else {
      setError(new Error("Must have both name and url."));
    }
  };

  return (
    <Card>
      <form className="w-full">
        <div className="w-full flex justify-between">
          <div className="w-full flex flex-col">
            <div className="mr-4 mb-2">
              <Input onChange={onChange} name="name" placeholder="name" />
            </div>
            <div className="mr-4 mb-2">
              <Input onChange={onChange} name="url" placeholder="url" />
            </div>
          </div>
          <div>
            <Button onClick={onSubmit}>Add</Button>
          </div>
        </div>
        <ErrorMessage>{error?.message}</ErrorMessage>
      </form>
    </Card>
  );
};

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
