/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRecipeNTInput = {
  id?: string | null,
  name: string,
  url: string,
  description?: string | null,
  tags?: string | null,
  thisWeek?: boolean | null,
  _version?: number | null,
};

export type ModelRecipeNTConditionInput = {
  name?: ModelStringInput | null,
  url?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  thisWeek?: ModelBooleanInput | null,
  and?: Array< ModelRecipeNTConditionInput | null > | null,
  or?: Array< ModelRecipeNTConditionInput | null > | null,
  not?: ModelRecipeNTConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type RecipeNT = {
  __typename: "RecipeNT",
  id: string,
  name: string,
  url: string,
  description?: string | null,
  tags?: string | null,
  thisWeek?: boolean | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateRecipeNTInput = {
  id: string,
  name?: string | null,
  url?: string | null,
  description?: string | null,
  tags?: string | null,
  thisWeek?: boolean | null,
  _version?: number | null,
};

export type DeleteRecipeNTInput = {
  id: string,
  _version?: number | null,
};

export type ModelRecipeNTFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  url?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  thisWeek?: ModelBooleanInput | null,
  and?: Array< ModelRecipeNTFilterInput | null > | null,
  or?: Array< ModelRecipeNTFilterInput | null > | null,
  not?: ModelRecipeNTFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRecipeNTConnection = {
  __typename: "ModelRecipeNTConnection",
  items:  Array<RecipeNT | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateRecipeNTMutationVariables = {
  input: CreateRecipeNTInput,
  condition?: ModelRecipeNTConditionInput | null,
};

export type CreateRecipeNTMutation = {
  createRecipeNT?:  {
    __typename: "RecipeNT",
    id: string,
    name: string,
    url: string,
    description?: string | null,
    tags?: string | null,
    thisWeek?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateRecipeNTMutationVariables = {
  input: UpdateRecipeNTInput,
  condition?: ModelRecipeNTConditionInput | null,
};

export type UpdateRecipeNTMutation = {
  updateRecipeNT?:  {
    __typename: "RecipeNT",
    id: string,
    name: string,
    url: string,
    description?: string | null,
    tags?: string | null,
    thisWeek?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteRecipeNTMutationVariables = {
  input: DeleteRecipeNTInput,
  condition?: ModelRecipeNTConditionInput | null,
};

export type DeleteRecipeNTMutation = {
  deleteRecipeNT?:  {
    __typename: "RecipeNT",
    id: string,
    name: string,
    url: string,
    description?: string | null,
    tags?: string | null,
    thisWeek?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type GetRecipeNTQueryVariables = {
  id: string,
};

export type GetRecipeNTQuery = {
  getRecipeNT?:  {
    __typename: "RecipeNT",
    id: string,
    name: string,
    url: string,
    description?: string | null,
    tags?: string | null,
    thisWeek?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListRecipeNTSQueryVariables = {
  filter?: ModelRecipeNTFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRecipeNTSQuery = {
  listRecipeNTS?:  {
    __typename: "ModelRecipeNTConnection",
    items:  Array< {
      __typename: "RecipeNT",
      id: string,
      name: string,
      url: string,
      description?: string | null,
      tags?: string | null,
      thisWeek?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncRecipeNTSQueryVariables = {
  filter?: ModelRecipeNTFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncRecipeNTSQuery = {
  syncRecipeNTS?:  {
    __typename: "ModelRecipeNTConnection",
    items:  Array< {
      __typename: "RecipeNT",
      id: string,
      name: string,
      url: string,
      description?: string | null,
      tags?: string | null,
      thisWeek?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateRecipeNTSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateRecipeNTSubscription = {
  onCreateRecipeNT?:  {
    __typename: "RecipeNT",
    id: string,
    name: string,
    url: string,
    description?: string | null,
    tags?: string | null,
    thisWeek?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateRecipeNTSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateRecipeNTSubscription = {
  onUpdateRecipeNT?:  {
    __typename: "RecipeNT",
    id: string,
    name: string,
    url: string,
    description?: string | null,
    tags?: string | null,
    thisWeek?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteRecipeNTSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteRecipeNTSubscription = {
  onDeleteRecipeNT?:  {
    __typename: "RecipeNT",
    id: string,
    name: string,
    url: string,
    description?: string | null,
    tags?: string | null,
    thisWeek?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};
