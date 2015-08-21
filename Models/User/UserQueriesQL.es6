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
  userList: {
    type: new GraphQLList(UserType),
    resolve: () => {
      return new Promise((resolve, reject) => {
        User.find({}, (err, res) => {
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
        User.find({}, (err, res) => {
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
