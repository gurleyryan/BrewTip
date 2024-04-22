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


export const ADD_COFFEE_HOUSE= gql`
mutation Mutation($ownerId: ID!, $coffeeName: String!, $address: String!, $bio: String!, $image: String!) {
  addCoffeeHouse(ownerId: $ownerId, coffeeName: $coffeeName, address: $address, bio: $bio, image: $image) {
    coffeeName
    address
    bio
    _id
    image
  }
}`;

export const REMOVE_COFFEE_HOUSE =gql`
mutation Mutation($coffeeId: ID!) {
  removeCoffeeHouse(coffeeId: $coffeeId) {
    coffeeName
    bio
    address
  }
}`



