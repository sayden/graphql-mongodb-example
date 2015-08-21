import express from 'express';
import schema from './schema.es6';

import {graphql} from 'graphql';
import bodyparser from 'body-parser';

import mongoose from 'mongoose';

import User from './Models/User/UserSchema.es6';
import Hobby from './Models/Hobby/HobbySchema.es6';

//Add a fake user to the DDBB
let hobby = new Hobby({title: 'cycling', description: 'a stupidly painful sport'});

let db = mongoose.connection;
db.on('open', function (callback) {
  hobby.save((err) => {
    Hobby.findById(hobby._id, (err, {_id}) => {
      let user = new User({
        name: "Mario",
        surname: "Castro",
        hobbies: [_id, _id]
      });

      user.save((err) => {
        user.hobbies.push(_id);
        user.save();
      });
    });
  });
});

let app = express();
let PORT = 9000;

//Let's use the body-parser middleware
app.use(bodyparser.text({type: 'application/graphql'}));

app.post('/', (req, res) => {
  //Execute the query
  graphql(schema, req.body)
    .then((result) => {
      res.send(result);
    });
});

let server = app.listen(PORT, function () {
  console.log(`Server listening at ${PORT}`);
  mongoose.connect('mongodb://localhost/test');
});
