/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      name
      searchCity
      searchBounds {
        bottomLeft {
          lat
          lng
        }
        topRight {
          lat
          lng
        }
      }
      listings {
        id
        name
        address
        location {
          lat
          lng
        }
        price
        numberOfBedrooms
        numberOfBathrooms
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        searchCity
        searchBounds {
          bottomLeft {
            lat
            lng
          }
          topRight {
            lat
            lng
          }
        }
        listings {
          id
          name
          address
          location {
            lat
            lng
          }
          price
          numberOfBedrooms
          numberOfBathrooms
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
