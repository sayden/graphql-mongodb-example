// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
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

import mongoose from 'mongoose';
import User from './Models/User/UserSchema.es6';
import Animal from './Models/Animal/AnimalSchema.es6';

import {
  UserQueries,
  UserMutations,
  UserType
  } from './Models/User/UserQL.es6';


//Persistence done in a variable (anything you like)
let _name = "";
let count = 0;

let RootQuery = new GraphQLObjectType({
  name: 'Query',      //Return this type of object
  fields: () => ({
    user: UserQueries.user,
    userList: UserQueries.userList,
    say: {
      type: GraphQLString,
      args: {
        message: {
          name: 'message',
          type: GraphQLString
        }
      },
      resolve: (root, {message}) => {
        return _name + " says " + message;
      }
    },
    name: {                  //We have a field called count
      type: GraphQLString,       //That returns an int (GraphQLInt)
      description: "Returns a name",
      resolve: () => {
        //Our persistence is a simple variable. Replace this with the
        //data from your ddbb, any third party server call, etc.
        return _name;
      }
    },
    count: {                  //We have a field called count
      type: GraphQLInt,       //That returns an int (GraphQLInt)
      description: "Returns the counter amount",
      resolve: () => {
        //Our persistence is a simple variable. Replace this with the
        //data from your ddbb, any third party server call, etc.
        return count;
      }
    }
  })
});


let RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: UserMutations.addUser,
    name: {
      type: GraphQLString,
      args: {
        name: {
          name: 'name',
          type: GraphQLString
        }
      },
      resolve: (root, {name}) => {
        _name = name;
        return _name;
      }
    },
    raiseCounter: {
      type: GraphQLInt,
      args: {
        amount: {
          name: 'amount',
          type: GraphQLInt
        }
      },
      resolve: (root, {amount}) => {
        count += amount;
        return count;
      }
    },
    dropCounter: {
      type: GraphQLInt,
      args: {
        amount: {
          name: 'amount',
          type: GraphQLInt
        }
      },
      resolve: (root, {amount}) => {
        count -= amount;
        return count;
      }
    }
  }
});


let schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

export default schema;
