const { Event, Donation, CoffeeHouse, Admin } = require('../models');

const resolvers = {
  Query: {
    events: async () => {
      return await Event.find({});
    },
    donations: async () => {
      return await Donation.find({});
    },
    coffeeHouses: async () => {
      return await CoffeeHouse.find({});
    },
    admins: async () => {
      return await Admin.find({});
    }
  },
  Mutation: {
    createEvent: async (_, { input }) => {
      const event = new Event(input);
      await event.save();
      return event;
    },
    createDonation: async (_, { input }) => {
      const donation = new Donation(input);
      await donation.save();
      return donation;
    },
    createCoffeeHouse: async (_, { input }) => {
      const coffeeHouse = new CoffeeHouse(input);
      await coffeeHouse.save();
      return coffeeHouse;
    },
    createAdmin: async (_, { input }) => {
      const admin = new Admin(input);
      await admin.save();
      return admin;
    }
  },
  CoffeeHouse: {
    events: async (coffeeHouse) => {
      return await Event.find({ _id: { $in: coffeeHouse.events } });
    }
  }
};

module.exports = resolvers;
