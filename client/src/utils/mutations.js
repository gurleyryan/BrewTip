import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($userEmail: String!, $password: String!) {
    login(userEmail: $userEmail, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_OWNER = gql`
  mutation addOwner(
    $userName: String!
    $userEmail: String!
    $password: String!
  ) {
    addOwner(
      userName: $userName
      userEmail: $userEmail
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
