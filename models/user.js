const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { PROFILE_IMAGE } = require('../constants/profileConstants');

const userSchema = new schema(
  {
    name: { type: String, required: true },
    image: { type: String, default: PROFILE_IMAGE },
  },
  { timestamps: true },
);

module.exports = user = mongoose.model('user', userSchema);
