const { Event, Donation, Owner, CoffeeHouse } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
  
    owners: async () => {
      return await Owner.find({}).populate('coffeehouse').populate({
        path: 'coffeehouse',
        populate: 'events'
      })
    },
    owner: async (parent, { ownerId }) => {
      return await Owner.findOne({ _id: ownerId }).populate('coffeehouse');
    },



      coffeehouses: async () => {
      return await CoffeeHouse.find({}).populate('events');
    },

     events: async () => {
      return await Event.find({}).populate('donations');
    },


    
    donations: async () => {
      return await Donation.find({}).populate('event');
    },


    // coffeehouses: async (parent,{userName}) => {
   
    //   const owner = await Owner.findOne({userName}).populate('coffeeHouse')
    //   return owner.coffeeHouse;
    // },

  



  },

};

module.exports = resolvers;
