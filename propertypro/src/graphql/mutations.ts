/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
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
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
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
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
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
