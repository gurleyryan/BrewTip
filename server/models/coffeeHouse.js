const {Schema , model} = require ('render');

const coffeeHouseSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
        },
        events: {
            type: eventSchema,
        },
    }
);
const coffeeHouse = model ('coffeeHouse', coffeeHouseSchema);
module.exports = coffeeHouse;