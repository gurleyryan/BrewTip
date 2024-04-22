const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const donationSchema = new Schema(
   {
      nameOfdonator: {
         type: String,
         trim: true,
      },
      donateAmount: {
      
         type: Number,
         required: true,
         
      },
      donationDate: {
         type: Date,
         default: Date.now,
         get: (timestamp) => dateFormat(timestamp),
      },
      message: {
         type: String,
         maxlength: 280,
         trim: true,
      },

      event:
      {
         type: Schema.Types.ObjectId,
         ref: 'Event'
      }


   }

);

const Donation = model('Donation', donationSchema);
module.exports = Donation;