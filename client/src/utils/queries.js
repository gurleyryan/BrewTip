import { gql } from '@apollo/client';



export const QUERY_USER = gql`
query getOwner($ownerId: ID!) {
  owner(ownerId: $ownerId) {
    _id
    userName
    userEmail
    coffeehouse {
      coffeeName
      address
      bio
    }
  }
}
`;

export const QUERY_COFFEEHOUSES = gql`
query getCoffeehouses {
  coffeehouses {
    _id
    coffeeName
    address
    bio
    image
  }
}

`;

// QUERY_SINGLE_THOUGHT retrieves a single thought along with its associated comments, based on the provided thoughtId variable.
export const QUERY_SINGLE_COFFEEHOUSE = gql`
  query getSingleCoffeeHouse($coffeeId: ID!) {
    coffeehouse(coffeeId: $coffeeId) {
    _id
    coffeeName
    address
    bio
    image
    events {
        _id
        eventName
        eventDetail
        Date
      }
    }
  }
`;


export const QUERY_SINGLE_EVENT_DETAIL = gql`
  query getSingleEventDetail($eventId: ID!) {
    event(eventId: $eventId) {
    _id
    eventName
    Date
    eventDetail
    event_Image
    donations {
        _id
        nameOfdonator
        donateAmount
        donationDate
        message
      }
    }
  }
`;




export const QUERY_ME = gql`
query me {
  me {
    _id
    userName
    userEmail
    coffeehouse {
      _id
      coffeeName
      address
      bio
    }
  }
}
`;

export const QUERY_DONATION = gql`
  query donation {
    donation {
      _id
      nameOfdonator
      donateAmount
      donationDate
      message
      event {
        _id
        eventName
        eventDetail
        Date
      }
    }
  }
`;



export const QUERY_CHECKOUT = gql`
  query getCheckout($donations: [DonationInput]) {
    checkout(donations: $donations) {
      session
    }
  }
`;