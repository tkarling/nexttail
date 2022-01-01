/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecipeNT = /* GraphQL */ `
  mutation CreateRecipeNT(
    $input: CreateRecipeNTInput!
    $condition: ModelRecipeNTConditionInput
  ) {
    createRecipeNT(input: $input, condition: $condition) {
      id
      name
      url
      description
      tags
      thisWeek
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateRecipeNT = /* GraphQL */ `
  mutation UpdateRecipeNT(
    $input: UpdateRecipeNTInput!
    $condition: ModelRecipeNTConditionInput
  ) {
    updateRecipeNT(input: $input, condition: $condition) {
      id
      name
      url
      description
      tags
      thisWeek
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteRecipeNT = /* GraphQL */ `
  mutation DeleteRecipeNT(
    $input: DeleteRecipeNTInput!
    $condition: ModelRecipeNTConditionInput
  ) {
    deleteRecipeNT(input: $input, condition: $condition) {
      id
      name
      url
      description
      tags
      thisWeek
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
