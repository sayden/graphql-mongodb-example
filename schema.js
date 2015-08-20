// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

//Persistence done in a variable (anything you like)
let message = "Hello world";
let count = 0;

let CounterType = new GraphQLObjectType({
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
});

let counterMutation = mutationWithClientMutationId({
  name: 'AddCounter',
  inputFields:{
    updateCount:{
      type: GraphQLInt,
      description: "A counter",
      resolve: () => {
        count++;
        return count;
      }
    }
  },
  outputFields:{
    counter:{
      type: CounterType,
      resolve:({something}) => { console.log(something) }
    }
  },
  mutateAndGetPayload: ({a,b}) => {
    console.log(a,b);
    return {a: a, b: b};
  }
});

let mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    raiseCounter: counterMutation
  })
});

let schema = new GraphQLSchema({
  query: CounterType,
  mutation: mutationType
});

export default schema;
