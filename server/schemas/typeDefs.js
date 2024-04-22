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
  image: String
  events: [Event]!
}

type Event
{
  _id: ID
  eventName: String
  Date: String
  eventDetail: String
  coffeeEvent: CoffeeHouse
  event_Image:[String]
  donations: [Donation]!
}

type Donation
{
  _id: ID
  nameOfdonator: String
  donateAmount: Int
  donationDate: String
  message: String
  event: Event
}

input DonationInput
{
  _id: ID
  nameOfdonator: String
  donateAmount: Int
  message: String
}

type Checkout {
  session: ID
}


  # Set up an Auth type to handle returning data from an owner creating or user login
  type Auth {
    token: ID!
    user: Owner 
  }

  type Query {
    checkout(donations:[DonationInput]): Checkout

    owners: [Owner]
    owner(ownerId: ID!): Owner

    coffeehouses: [CoffeeHouse]
    coffeehouse(coffeeId: ID!): CoffeeHouse

    events: [Event]
    event(eventId: ID!): Event
    
    donations: [Donation]
    donation(donationId: ID!): Donation

    me: Owner
  }

  type Mutation {
    addOwner(userName: String!, userEmail: String!, password: String!): Auth
    login(userEmail: String!, password: String!): Auth

    addCoffeeHouse(ownerId: ID!, coffeeName: String!, address: String!, bio: String!,image:String!): CoffeeHouse
    tkAddCoffeeHouse(coffeeName: String!, address: String!, bio: String!,image: String!): CoffeeHouse
    removeCoffeeHouse(coffeeId: ID!): CoffeeHouse
    tkRemoveCoffeeHouse(coffeeId: ID!): CoffeeHouse
    updateCoffeeHouse(coffeeId: ID!, bio: String!): CoffeeHouse
    tkUpdateCoffeeHouse(coffeeId: ID!, bio: String!): CoffeeHouse


    addEvent(coffeeId: ID!, eventName: String!, eventDetail: String!): Event
    removeEvent(coffeeId: ID!, eventId: ID!): CoffeeHouse
    updateEvent(eventId: ID!, eventDetail: String!): Event

    tkAddEvent(coffeeId: ID!, eventName: String!, eventDetail: String!): Event
    tkRemoveEvent(coffeeId: ID!, eventId: ID!): CoffeeHouse
    tkUpdateEvent(eventId: ID!, eventDetail: String!): Event




    addDonation(eventId: ID!, nameOfdonator: String!, donateAmount: Int!, message: String!): Donation


    
  }

`;

module.exports = typeDefs;
// addCoffeeHouse(coffeeName: String!, address: String!, bio: String!): CoffeeHouse