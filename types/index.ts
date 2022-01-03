export interface RecipeContent {
  name: string;
  url: string;
  thisWeek?: boolean;
  tags?: string;
}

export interface Recipe extends RecipeContent {
  id: string;
  _version: number;
}
