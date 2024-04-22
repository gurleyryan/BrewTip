const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const eventsSchema = new Schema(
    {
        eventName: {
            type: String,
            required: true,
            trim: true,
        },
        Date: {
            type: Date,
            default: Date.now,
            required: true,
            get: (timestamp) => dateFormat(timestamp),
       
        },

        eventDetail:
        {
            type: String,
            required: 'You need to leave a detail!',
            trim: true
        },
        coffeeEvent:
        {
             
                type: Schema.Types.ObjectId,
                ref: 'CoffeeHouse'
            
        },
        
        event_Image:
        [
            {
                type: String
            }
        ],
        donations:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Donation'
            }
        ]

     

    }
);

// // Create a virtual property `getTags` that gets the amount of tags associated with an application
// eventsSchema
//     .virtual('getDonationTotal')
//     // Getter
//     .get(function () {
//         return this.tags.length;
//     });

const Event = model('Event', eventsSchema);
module.exports = Event; 