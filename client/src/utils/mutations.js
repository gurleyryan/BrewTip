import { gql } from '@apollo/client';

export const LOGIN_OWNER = gql`
mutation Mutation($userEmail: String!, $password: String!) {
  login(userEmail: $userEmail, password: $password) {
    token
    user {
      _id
      userEmail
      userName
    }
  }
}
`;

export const ADD_OWNER = gql`
mutation Mutation($userName: String!, $userEmail: String!, $password: String!) {
  addOwner(userName: $userName, userEmail: $userEmail, password: $password) {
    token
    user {
      _id
      userEmail
      userName
    }
  }
}
`;

export const ADD_COFFEEHOUSE = gql`
mutation Mutation($ownerId: ID!, $coffeeName: String!, $address: String!, $bio: String!) {
  addCoffeeHouse(ownerId: $ownerId, coffeeName: $coffeeName, address: $address, bio: $bio) {
    _id
    address
    bio
    coffeeName
  }
}
`;