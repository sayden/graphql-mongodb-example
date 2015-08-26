import express from 'express';
import schema from './schema.es6';

import {graphql} from 'graphql';
import bodyparser from 'body-parser';

import mongoose from 'mongoose';

let db = mongoose.connection;

let app = express();
let PORT = 9000;

//Let's use the body-parser middleware
app.use(bodyparser.text({type: 'application/graphql'}));

app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static('index.html'));

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
