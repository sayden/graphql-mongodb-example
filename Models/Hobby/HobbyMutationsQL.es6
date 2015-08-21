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
  addHobby:{
    type:HobbyType,
    args: {
      title:{
        name:'title',
        type:new GraphQLNonNull(GraphQLString)
      },
      description:{
        name:'description',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, {title, description}) => {
      var newHobby = new Hobby({title:title, description:description});

      return new Promise((resolve, reject) => {
        newHobby.save((err, res) => {
          err ? reject(err): resolve(res);
        });
      });
    }
  }
};
