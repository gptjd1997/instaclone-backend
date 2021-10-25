require("dotenv").config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { resolvers, typeDefs } from "./schema";
import { getUser, protectedResolver } from "./Users/users.utils";
import client from "./client";

const PORT = process.env.PORT;
const startServer = async () => {
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
        protectedResolver,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apollo.start();

  const app = express();
  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));
  apollo.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(`🎶Server is running on http://localhost:${PORT}/graphql`);
  });
};

startServer();
