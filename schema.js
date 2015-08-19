// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt
} from 'graphql';

//Persistence done in a variable (anything you like)
let message = "Hello world";
let count = 0;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'GetCounter',      //Return this type of object
    fields: {
      message: {                  //We have a field called count
        type: GraphQLString,       //That returns an int (GraphQLInt)
        description: "Hello world in graphql",
        resolve: () => {
          //Our persistence is a simple variable. Replace this with the
          //data from your ddbb, any third party server call, etc.
          return message;
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'AddCounter',
    fields:{
      updateCount:{
        type: GraphQLInt,
        description: "A counter",
        resolve: () => {
          count++;
          return count;
        }
      }
    }
  })
});

export default schema;
