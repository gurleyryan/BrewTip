const { Event, Donation, Owner, CoffeeHouse } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
  
    owners: async () => {
      return await Owner.find({}).populate('coffeehouse').populate({
        path: 'coffeehouse',
        populate: ['events',
          {
          path: 'events',
          populate: 'donations'
          }
        ]
      })
    },

    owner: async (parent, { ownerId }) => {
      return await Owner.findOne({ _id: ownerId }).populate('coffeehouse').populate({
        path: 'coffeehouse',
        populate: ['events',
          {
          path: 'events',
          populate: 'donations'
          }
        ]
      })
    },



   coffeehouses: async () => {
      return await CoffeeHouse.find({}).populate('events').populate
      ({
        path: 'events',
        populate: 'donations'
      });
    },

    coffeehouse: async (parent, { coffeeId }) => {
      return await CoffeeHouse.findOne({ _id: coffeeId }).populate('events').populate
      ({
        path: 'events',
        populate: 'donations'
      });
    },


     events: async () => {
      return await Event.find({}).populate('donations').populate
      ('coffeeEvent');
    },
    event: async (parent, { eventId }) => {
      return await Event.findOne({ _id: eventId }).populate('donations').populate
      ('coffeeEvent');
    },



    donations: async () => {
      return await Donation.find({}).populate('event');
    },
    donation: async (parent, { donationId }) => {
      return await Donation.findOne({ _id: donationId }).populate('event');
    },

    // coffeehouses: async (parent,{userName}) => {
   
    //   const owner = await Owner.findOne({userName}).populate('coffeeHouse')
    //   return owner.coffeeHouse;
    // },

  },

  Mutation: {
    addOwner: async (parent, { userName, userEmail, password }) => {
      const profile = await Owner.create({ userName, userEmail, password });
      const token = signToken(profile);

      return { token, profile };
    },

    login: async (parent, { userEmail, password }) => {
      const user = await Owner.findOne({ userEmail });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw "AuthenticationError";
      }

      const token = signToken(user);

      return { token, user };
    },


    addCoffeeHouse: async (parent, {ownerId, coffeeName, address,bio }) => {
      
      return Owner.findOneAndUpdate(
        { _id: ownerId },
        {
         $addToSet: {coffeehouse: await CoffeeHouse.create({ coffeeName, address, bio })},
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    addEvent: async (parent, {coffeeId, eventName, eventDetail }) => {
      
      return CoffeeHouse.findOneAndUpdate(
        { _id: coffeeId },
        {
         $addToSet: {events: await Event.create({ eventName, eventDetail })},
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },


    addDonation: async (parent, {eventId, nameOfdonator, donateAmount, message }) => {

      return await Event.findOneAndUpdate(
        { _id: eventId },
        {
          $addToSet:{donations: await Donation.create({ nameOfdonator, donateAmount,message })},
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeCoffeeHouse: async (parent, { coffeeId }) => {
      return CoffeeHouse.findOneAndDelete({ _id: coffeeId });
    },

    removeEvent: async (parent, { coffeeId, eventId }) => {
      return CoffeeHouse.findOneAndUpdate(
        { _id: coffeeId },
        { events: await Event.findOneAndDelete({ _id: eventId })} ,
        { new: true }
      );
    },

    updateCoffeeHouse: async (parent, { coffeeId, bio }) => {
      return await CoffeeHouse.findOneAndUpdate({ _id: coffeeId }, { bio }, {new: true});
    
    },

    updateEvent: async (parent, { eventId, eventDetail }) => {
      return await Event.findOneAndUpdate({ _id: eventId }, { eventDetail }, {new: true});
    
    }

  }


};

module.exports = resolvers;
