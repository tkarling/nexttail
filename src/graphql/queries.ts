/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecipeNT = /* GraphQL */ `
  query GetRecipeNT($id: ID!) {
    getRecipeNT(id: $id) {
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
export const listRecipeNTS = /* GraphQL */ `
  query ListRecipeNTS(
    $filter: ModelRecipeNTFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipeNTS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncRecipeNTS = /* GraphQL */ `
  query SyncRecipeNTS(
    $filter: ModelRecipeNTFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRecipeNTS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
