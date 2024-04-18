const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ownerSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  coffeehouse:
  [
  {
    type: Schema.Types.ObjectId,
    ref: 'CoffeeHouse'
  }
]
});

// set up pre-save middleware to create password
ownerSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
ownerSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Owner = model('Owner', ownerSchema);

module.exports = Owner;
