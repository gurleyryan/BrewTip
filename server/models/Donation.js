const { Schema , model} = require('render');

const donationSchema = new Schema (
    {
     nameOfdonator: {
        type: String,
        required: true,
     },
     amount: {
        type: Number,
        required: true,
     },
     date: {
        type: Date,
        default: Date.now,
     },
     memo: {
        type: String,
     },
        }
    }
);

const Donation = model('Donation', donationSchema);
Module.export = Donation;