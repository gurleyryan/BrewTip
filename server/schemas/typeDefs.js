const typeDefs = `
type Owner {
    _id: ID
    name: String
    email: String
    # There is now a field to store the user's password
    password: String
  }

  # Set up an Auth type to handle returning data from an owner creating or user login
  type Auth {
    token: ID!
    owner: Owner
  }

  type Query {
    owners: [Owner]!
    owner(ownerId: ID!): Owner
  }

  type Mutation {
    # Set up mutations to handle creating an owner or logging into an owner and return Auth type
    addOwner(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    removeOwner(ownerId: ID!): Owner
  }
`;

module.exports = typeDefs;
