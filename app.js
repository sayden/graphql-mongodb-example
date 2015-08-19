import express from 'express';
import schema from './schema';

import {graphql} from 'graphql';
import bodyparser from 'body-parser';

let app  = express();
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
});
