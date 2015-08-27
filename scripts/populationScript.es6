import mongoose from 'mongoose';

import User from '../Models/User/UserSchema.es6';
import Hobby from '../Models/Hobby/HobbySchema.es6';

mongoose.connect('mongodb://localhost/test');

let hobbyCycling = new Hobby({
  title:'cycling',
  description:'a painful sport',
  type:"hobby"
});

let hobbyHorses = new Hobby({
  title:'horses',
  description:'to get in one with an animal',
  type:"hobby"
});

let hobbyFlying = new Hobby({
  title:'flying',
  description:'man and machine in one',
  type:"hobby"
});

let hobbySleeping = new Hobby({
  title:'sleeping',
  description:'resting for whole day',
  type:"hobby"
});


let userRichard = new User({
  name:"Richard",
  surname:"Stallman",
  age:30,
  hobbies:[hobbyCycling, hobbyFlying],
  type:"user"
});

let userDonald = new User({
  name:"Donald",
  surname:"Knuth",
  age:26,
  hobbies:[hobbyHorses, hobbySleeping],
  type:"user"
});

let userLinus = new User({
  name:"Linux",
  surname:"Torvalds",
  age:8,
  hobbies:[hobbySleeping],
  type:"user"
});

let userTim = new User({
  name:"Tim",
  surname:"Berners-Lee",
  age:2,
  hobbies:[hobbySleeping, hobbyHorses],
  friends:[userRichard, userDonald],
  type:"user"
});

userDonald.friends = [userRichard, userTim, userLinus];
userRichard.friends = [userDonald, userTim, userLinus];
userLinus.friends = [userRichard, userDonald];


hobbyCycling.save();
hobbyFlying.save();
hobbyHorses.save();
hobbySleeping.save();

userRichard.save();
userDonald.save();
userLinus.save();
userTim.save();

setTimeout(function() {
  console.log(userRichard._id);
  mongoose.disconnect();
}, 1000);