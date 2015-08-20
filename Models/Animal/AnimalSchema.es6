import mongoose from 'mongoose';

var AnimalSchema = new mongoose.Schema({
  id: String,
  name: String,
  raze: String
});

module.exports = mongoose.model('Animal', AnimalSchema);