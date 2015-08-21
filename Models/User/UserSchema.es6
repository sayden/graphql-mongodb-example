import mongoose from 'mongoose';

import Hobby from '../Hobby/HobbySchema.es6';

var UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  surname: String,
  age: Number,
  hobbies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Hobby'}]
});

module.exports = mongoose.model('User', UserSchema);
