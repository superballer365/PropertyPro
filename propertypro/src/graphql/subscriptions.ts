/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession {
    onCreateSession {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession {
    onUpdateSession {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession {
    onDeleteSession {
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
