import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { typeDefs, resolvers } from "./movies";
import dotenv from "dotenv";

dotenv.config();

const apolloServer = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: ({ req, res }) => ({ req, res }),
  playground: true
});

const app = express();
app.use(express.json());
apolloServer.applyMiddleware({ app, cors: false });

app.listen(parseInt(process.env.MOVIES_PORT), ()=> {
    console.log(`🚀 Movies server ready at localhost:${process.env.MOVIES_PORT}`);
});
