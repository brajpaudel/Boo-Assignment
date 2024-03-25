const mongoose = require('mongoose');
const schema = mongoose.Schema;

const counterSchema = new mongoose.Schema({
  _id: String,
  seq: Number,
});

module.exports = counter = mongoose.model('Counter', counterSchema);
