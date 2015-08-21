import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import User from './UserSchema.es6';

export default new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    surname:{
      type: GraphQLString
    },
    age:{
      type: GraphQLInt
    },
    hobbies:{
      type: new GraphQLList(GraphQLString)
    }
  })
});
