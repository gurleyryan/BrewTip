const { Event, Donation, Owner, CoffeeHouse } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
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


    me: async (parent, args, context) => {
      if (context.user) {
        return await Owner.findOne({ _id: context.user._id }).populate('coffeehouse').populate({
          path: 'coffeehouse',
          populate: ['events',
            {
            path: 'events',
            populate: 'donations'
            }
          ]
        })
      }
      throw AuthenticationError;
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


    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
      await Donation.create({nameOfdonator, donateAmount , message });
      const line_donations = [];

      for (const donation of args.donations) {
        line_donations
        .push({
          price_data: {
            currency: 'usd',

            donation_data: {
              nameOfdonator: donation.nameOfdonator,
              message: donation.message,
              donateAmount: donation.donateAmount,
            },
        
          },
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_donations,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },

  },

  Mutation: {
    addOwner: async (parent, { userName, userEmail, password }) => {
      const user = await Owner.create({ userName, userEmail, password });
      const token = signToken(user);

      return { token, user };
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

    

    // addCoffeeHouse: async (parent, {ownerId, coffeeName, address,bio }) => {
      
    //   return Owner.findOneAndUpdate(
    //     { _id: ownerId },
    //     {
    //      $addToSet: {coffeehouse: await CoffeeHouse.create({ coffeeName, address, bio })},
    //     },
    //     {
    //       new: true,
    //       runValidators: true,
    //     }
    //   );
      
    // },

    addCoffeeHouse: async (parent, {ownerId, coffeeName, address,bio,image }) => {
     
      const coffeehouse = await CoffeeHouse.create({
        coffeeName,
        address,
        bio,
        image
      });

      await Owner.findOneAndUpdate(
        { _id: ownerId},
        { $addToSet: { coffeehouse: coffeehouse._id } }
      );

      return coffeehouse;
  
  },




    tkAddCoffeeHouse: async (parent, {ownerId, coffeeName, address,bio,image },context) => {
      if (context.user) {
        const coffeehouse = await CoffeeHouse.create({
          coffeeName,
          address,
          bio,
          image
        });

        await Owner.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { coffeehouse: coffeehouse._id } }
        );

        return coffeehouse;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },

    addEvent: async (parent, {coffeeId, eventName, eventDetail }) => {
        const events = await Event.create({ eventName, eventDetail })
      
       await CoffeeHouse.findOneAndUpdate(
        {_id: coffeeId},
        { $addToSet: { events: events._id } }

       );
       return events
    },


    tkAddCoffeeHouse: async (parent, {ownerId, coffeeName, address,bio },context) => {
      if (context.user) {
        const coffeehouse = await CoffeeHouse.create({
          coffeeName,
          address,
          bio
        });

        await Owner.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { coffeehouse: coffeehouse._id } }
        );

        return coffeehouse;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },


    tkAddEvent: async (parent, {coffeeId, eventName, eventDetail },context) => {
      if (context.user) {
        const events = await Event.create({ eventName, eventDetail })
      
       await CoffeeHouse.findOneAndUpdate(
        {_id: coffeeId},
        { $addToSet: { events: events._id } }

       );
       return events
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },

    addDonation: async (parent, {eventId, nameOfdonator, donateAmount, message }) => {
      const donations = await Donation.create({ nameOfdonator, donateAmount,message });

       await Event.findOneAndUpdate(
        { _id: eventId },
        {
          $addToSet:{donations: donations._id },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return donations
    },


    removeCoffeeHouse: async (parent, { coffeeId }) => {
      return CoffeeHouse.findOneAndDelete({ _id: coffeeId });
    },




    tkRemoveCoffeeHouse: async (parent, { coffeeId }, context) => {
      if (context.user) {
        const coffeehouse = await CoffeeHouse.findOneAndDelete({
          _id: coffeeId,
        });

        await Owner.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { coffeehouse: coffeehouse._id } }
        );

        return coffeehouse;
      }
      throw AuthenticationError;
    },

    
    tkUpdateCoffeeHouse: async (parent, { coffeeId, bio },context) => {

      if(context,user)
      {
        return await CoffeeHouse.findOneAndUpdate({ _id: coffeeId }, { bio }, {new: true});
      }
      
      throw AuthenticationError;
    },


    updateCoffeeHouse: async (parent, { coffeeId, bio }) => {
      return await CoffeeHouse.findOneAndUpdate({ _id: coffeeId }, { bio }, {new: true});
    },


 

    removeEvent: async (parent, { coffeeId, eventId }) => {
      return CoffeeHouse.findOneAndUpdate(
        { _id: coffeeId },
        { events: await Event.findOneAndDelete({ _id: eventId })} ,
        { new: true }
      );
    },

    tkRemoveEvent: async (parent, { coffeeId, eventId },context) => {
        if(context.user)
        {
      return CoffeeHouse.findOneAndUpdate(
        { _id: coffeeId },
        { events: await Event.findOneAndDelete({ _id: eventId })} ,
        { new: true }
      );
    }
      throw AuthenticationError;
    },



    updateEvent: async (parent, { eventId, eventDetail }) => {
      return await Event.findOneAndUpdate({ _id: eventId }, { eventDetail }, {new: true});
    
    },

    
    tkUpdateEvent: async (parent, { eventId, eventDetail },context) => {
      if(context.user){
      return await Event.findOneAndUpdate({ _id: eventId }, { eventDetail }, {new: true});
      }
      throw AuthenticationError;
    }

  }


};

module.exports = resolvers;
