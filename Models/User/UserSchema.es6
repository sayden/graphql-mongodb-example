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

let User = mongoose.model('User', UserSchema);

module.exports = User;

module.exports.getUserByPosition = (root, {id}) => {
  return new Promise((resolve, reject) => {
    User.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res[id]);
    })
  });
};

module.exports.updateUser = (user) => {
  return new Promise((resolve, reject) => {
    user.save((err, res) => {
      err ? reject(err): resolve(res);
    });
  });
};

module.exports.getListOfUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}).populate('hobbies friends').exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};