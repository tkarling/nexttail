import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type RecipeNTMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class RecipeNT {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly description?: string;
  readonly tags?: string;
  readonly thisWeek?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<RecipeNT, RecipeNTMetaData>);
  static copyOf(source: RecipeNT, mutator: (draft: MutableModel<RecipeNT, RecipeNTMetaData>) => MutableModel<RecipeNT, RecipeNTMetaData> | void): RecipeNT;
}