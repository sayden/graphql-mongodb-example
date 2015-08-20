import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  surname: String
});

module.exports = mongoose.model('User', UserSchema);