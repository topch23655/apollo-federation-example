import { gql } from "apollo-server-express";
import { Auth }  from "./firebase";

export const typeDefs = gql`
  extend type Mutation {
    signin(uid: String!): AccessToken
  }

  type AccessToken {
    accessToken: ID
  }
`;

export const resolvers = {
  Mutation: {
    signin: async (_, { uid }, context) => {
      const accessToken = Auth
      .createCustomToken(uid)
      .then((customToken) => {
        return customToken;
      })
      .catch((error) => {
        throw new Error('Error creating custom token:', error);
      });
      return accessToken;
    },
  },
};