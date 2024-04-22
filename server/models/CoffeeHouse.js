const {Schema , model} = require ('mongoose');

const coffeeHouseSchema = new Schema (
    {
        coffeeName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        bio: {
            type: String,
            trim: true,
        },
        image: {
            type: String
          },
        events: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        ]
           
        
    }
);
const CoffeeHouse = model ('CoffeeHouse', coffeeHouseSchema);
module.exports = CoffeeHouse;
