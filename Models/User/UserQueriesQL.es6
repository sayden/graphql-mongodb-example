import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import UserType from './UserTypeQL.es6';
import User from './UserSchema.es6';

export default {
  users: {
    type: new GraphQLList(UserType),
    resolve: () => {
      return new Promise((resolve, reject) => {
        User.find({}).populate('hobbies').exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      return new Promise((resolve, reject) => {
        //User is a Mongoose schema
        User.find({}).populate('hobbies').exec((err, res) => {
          if (id == undefined) {
            err ? reject(err) : resolve(res);
          } else {
            err ? reject(err) : resolve(res[id]);
          }
        });
      });
    }
  }
};
