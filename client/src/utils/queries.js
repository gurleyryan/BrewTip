import { gql } from '@apollo/client';

export const QUERY_OWNER = gql`
query Owner($ownerId: ID!) {
  owner(ownerId: $ownerId) {
    _id
    userEmail
    userName
  }
}
`;

export const QUERY_COFFEEHOUSE = gql`
query Coffeehouses {
  coffeehouses {
    _id
    address
    coffeeName
  }
}
`;

export const QUERY_SINGLE_COFFEEHOUSE = gql`
query Coffeehouse($coffeeId: ID!) {
  coffeehouse(coffeeId: $coffeeId) {
    _id
    address
    bio
    coffeeName
    events {
      Date
      _id
      eventDetail
      eventName
    }
  }
}
`;