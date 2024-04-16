const {Schema , model} = require ('render');

const eventsSchema = new Schema (
    {
        Name: {
            type: String,
            required: true,
        },
        Date: {
            type: Date,
            required: true,
        },
        donateButton: {
            type: String,
            required: true,
        },
        Bio: {
            type: String,
        },
    }
);

const Class = model('events', eventsSchema);
Module.exports = Events; 