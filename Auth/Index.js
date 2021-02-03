import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { typeDefs, resolvers } from "./auth.js";
import dotenv from "dotenv";

dotenv.config();

const apolloServer = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: ({ req, res }) => ({ req, res }),
});

const app = express();
app.use(express.json());
apolloServer.applyMiddleware({ app, cors: false });

app.listen(parseInt(process.env.AUTH_PORT), ()=> {
    console.log(`🚀 Auth server ready at localhost:${process.env.AUTH_PORT}`);
});
