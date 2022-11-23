import { Recipe } from "../types";
import { Button, Card, Checkbox } from "./Common";

const RecipeCard = ({
  recipe,
  toggleThisWeek,
  deleteRecipe,
}: {
  recipe: Recipe;
  toggleThisWeek: (recipe: Recipe) => void;
  deleteRecipe: (recipe: Recipe) => void;
}) => {
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
              <h2 className="capitalize text-base">{name}</h2>
              <div className="text-sm text-indigo-500 h-5">{tags}</div>
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <Button onClick={() => deleteRecipe(recipe)} color="danger">
            x
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RecipeCard;
