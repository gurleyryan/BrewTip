const db = require('../config/connection');
const { Owner, CoffeeHouse, Event, Donation } = require('../models');
const cleanDB = require('./cleanDB');

const ownerData = require('./userSeeds.json');
const coffeeHouseData = require('./coffeeHouseSeeds.json');
const eventData = require('./eventSeeds.json');
const donationData = require('./donationSeeds.json');


// function inArray(arr, el) {
//   for(var i = 0 ; i < arr.length; i++) 
//           if(arr[i] == el) return true;
//   return false;
// }

// function getRandomIntNoDuplicates(min, max, DuplicateArr) {
//   var RandomInt = Math.floor(Math.random() * (max - min + 1)) + min;
//   if (DuplicateArr.length > (max-min) ) return false;  // break endless recursion
//   if(!inArray(DuplicateArr, RandomInt)) {
//      DuplicateArr.push(RandomInt); 
//      return RandomInt;
//   }
//   return getRandomIntNoDuplicates(min, max, DuplicateArr); //recurse
// }



db.once('open', async () => {
  // clean database
  await cleanDB("Owner", "owners");
  await cleanDB("CoffeeHouse", "coffeehouses");
  await cleanDB("Event", "events");
  await cleanDB("Donation", "donations");

  // bulk create each model
  const owners = await Owner.insertMany(ownerData);
  const coffeehouses = await CoffeeHouse.insertMany(coffeeHouseData);
  const events = await Event.insertMany(eventData);
  const donations = await Donation.insertMany(donationData);



  // this one will randomly assign coffeHouse model to a randomly Owner
  for (newOwner of owners) {

    const tempCoffee = coffeehouses[Math.floor(Math.random() * coffeehouses.length)];

    newOwner.coffeehouse = tempCoffee._id;
    
    await newOwner.save();

  }

  // this one will randomly assign events to coffeehouse model
  for (newEvent of events) {

    const tempCoffee = coffeehouses[Math.floor(Math.random() * coffeehouses.length)];
  
    tempCoffee.events.push(newEvent._id);
    await tempCoffee.save();

    newEvent.coffeeEvent = tempCoffee._id;
    await newEvent.save();

  }


// this one will randomly assign eventId to donation Model
  for(newDonation of donations)
  {
    const tempEvent = events[Math.floor(Math.random() * (events.length))];
     newDonation.event = tempEvent._id;
     await newDonation.save();

     tempEvent.donations.push(newDonation._id);
     await tempEvent.save();



  }



  console.log('all done!');
  process.exit(0);
});
