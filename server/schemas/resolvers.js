const { Owner } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        owners: async () => {
          return Owner.find();
        },
    
        owner: async (parent, { ownerId }) => {
          return Owner.findOne({ _id: ownerId });
        },
      },
    
      Mutation: {
        addOwner: async (parent, { name, email, password }) => {
          const owner = await Owner.create({ name, email, password });
          const token = signToken(owner);
    
          return { token, owner };
        },
        login: async (parent, { email, password }) => {
          const owner = await Owner.findOne({ email });
    
          if (!owner) {
            throw AuthenticationError
          }
    
          const correctPw = await owner.isCorrectPassword(password);
    
          if (!correctPw) {
            throw AuthenticationError
          }
    
          const token = signToken(owner);
          return { token, owner };
        },
    
        removeOwner: async (parent, { ownerId }) => {
          return Owner.findOneAndDelete({ _id: ownerId });
        },
      },
};

module.exports = resolvers;
