import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($userEmail: String!, $password: String!) {
    login(userEmail: $userEmail, password: $password) {
      token
      user {
        _id
        userName
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
        userName
      }
    }
  }
`;


export const ADD_DONATION= gql`
mutation Mutation($eventId: ID!, $nameOfdonator: String!, $donateAmount: Int!, $message: String!) {
  addDonation(eventId: $eventId, nameOfdonator: $nameOfdonator, donateAmount: $donateAmount, message: $message) {
    nameOfdonator
    donateAmount

  }
}`;