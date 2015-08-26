import mongoose from 'mongoose';

import Hobby from '../Hobby/HobbySchema.es6';

let UserSchema = new mongoose.Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  name: String,
  surname: String,
  age: Number,
  hobbies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Hobby'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  type: String
});

UserSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('User', UserSchema);
