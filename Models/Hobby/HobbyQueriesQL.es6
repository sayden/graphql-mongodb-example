import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import HobbyType from './HobbyTypeQL.es6';
import Hobby from './HobbySchema.es6';

export default {
  hobbies: {
    type: new GraphQLList(HobbyType),
    resolve: Hobby.getListOfHobbies
  },
  hobby: {
    type: HobbyType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: Hobby.getHobbyByPosition
  }
};
