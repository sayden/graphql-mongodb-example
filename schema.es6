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
import Hobby from './Models/Hobby/HobbySchema.es6';

import {
  UserQueries,
  UserMutations,
  UserType
  } from './Models/User/UserQL.es6';

import {
  HobbyType,
  HobbyQueries,
  HobbyMutations,
  } from './Models/Hobby/HobbyQL.es6';


let RootQuery = new GraphQLObjectType({
  name: 'Query',      //Return this type of object
  fields: () => ({
    findUserById: UserQueries.findUserById,
    listUser: UserQueries.listUser,
    findHobbyById: HobbyQueries.findHobbyById,
    listHobbies: HobbyQueries.listHobbies,
    hobbies: HobbyQueries.hobbies
  })
});


let RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addUser: UserMutations.addUser,
    addHobby: HobbyMutations.addHobby
  })
});


let schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

export default schema;
