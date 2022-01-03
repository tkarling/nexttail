import { useState } from "react";
import { Card, Button, Input, ErrorMessage } from "../components/Common";
import { RecipeContent } from "../types";

const AddRecipe = ({
  addRecipe,
}: {
  addRecipe: (recipe: RecipeContent) => void;
}) => {
  const [inputs, setInputs] = useState<Partial<RecipeContent>>({});
  const [error, setError] = useState<Error | null>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (inputs.name && inputs.url) {
      addRecipe(inputs as RecipeContent);
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
            <div className="mr-4 mb-2">
              <Input onChange={onChange} name="tags" placeholder="tags" />
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

export default AddRecipe;
