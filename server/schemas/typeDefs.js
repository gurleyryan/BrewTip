const typeDefs = `
type Owner {
    _id: ID
    userName: String
    userEmail: String
    coffeehouse: [CoffeeHouse]!
  }


type CoffeeHouse
{
  _id: ID
  coffeeName: String
  address: String
  bio: String
  events: [Event]!
}

type Event
{
  _id: ID
  eventName: String
  Date: String
  eventDetail: String
  coffeeEvent: CoffeeHouse
  donations: [Donation]!
}

type Donation
{
  _id: ID
  nameOfdonator: String
  donateAmount: Float
  donationDate: String
  message: String
  event: Event
}



  # Set up an Auth type to handle returning data from an owner creating or user login
  type Auth {
    token: ID!
    user: Owner 
  }

  type Query {
    owners: [Owner]
    owner(ownerId: ID!): Owner

    coffeehouses: [CoffeeHouse]
    coffeehouse(coffeeId: ID!): CoffeeHouse

    events: [Event]
    event(eventId: ID!): Event
    
    donations: [Donation]
    donation(donationId: ID!): Donation
  }

  type Mutation {
    addOwner(userName: String!, userEmail: String!, password: String!): Auth
    login(userEmail: String!, password: String!): Auth
    addCoffeeHouse(ownerId: ID!, coffeeName: String!, address: String!, bio: String!): CoffeeHouse
    addEvent(coffeeId: ID!, eventName: String!, eventDetail: String!): Event
    addDonation(eventId: ID!, nameOfdonator: String!, donateAmount: Float!, message: String!): Donation
    removeCoffeeHouse(coffeeId: ID!): CoffeeHouse
    removeEvent(coffeeId: ID!, eventId: ID!): CoffeeHouse

    updateCoffeeHouse(coffeeId: ID!, bio: String!): CoffeeHouse
    updateEvent(eventId: ID!, eventDetail: String!): Event
  }

`;

module.exports = typeDefs;
// addCoffeeHouse(coffeeName: String!, address: String!, bio: String!): CoffeeHouse