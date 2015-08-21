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
    resolve: () => {
      return new Promise((resolve, reject) => {
        Hobby.find({}, (err, res) => {
          err ? reject(err) : resolve(res.hobbies);
        });
      });
    }
  },
  listHobbies: {
    type: new GraphQLList(HobbyType),
    resolve: () => {
      return new Promise((resolve, reject) => {
        Hobby.find({}, (err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  findHobbyById: {
    type: HobbyType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      return new Promise((resolve, reject) => {
        //User is a Mongoose schema
        Hobby.find({}, (err, res) => {
            err ? reject(err) : resolve(res[id]);
        });
      });
    }
  }
};
