import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  surname: String,
  age: Number
});

module.exports = mongoose.model('User', UserSchema);
