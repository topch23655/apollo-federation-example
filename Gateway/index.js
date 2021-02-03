import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";
import AuthenticatedDataSource from "./AuthenticatedDataSource";
import dotenv from "dotenv";

dotenv.config();

const gateway = new ApolloGateway({
    serviceList: [
      {
        name: "auth",
        url: `${process.env.AUTH_DOMAIN}`,
      },
    ],
    buildService({ name, url }) {
      return new AuthenticatedDataSource({ url });
    },
  });
  
  const apolloServer = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ req }) => ({ req, res: req.res }),
  });
  
  const app = express();
  apolloServer.applyMiddleware({ app, cors: false });
  
  app.listen(process.env.GATEWAY_PORT,()=> {
      console.log(`🚀 Gateway ready at localhost:${process.env.GATEWAY_PORT}`);
  });