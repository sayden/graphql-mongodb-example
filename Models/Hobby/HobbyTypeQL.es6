import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import Hobby from './HobbySchema.es6';

export default new GraphQLObjectType({
  name: 'Hobby',
  description: 'A hobby',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description:{
      type: GraphQLString
    }
  })
});
