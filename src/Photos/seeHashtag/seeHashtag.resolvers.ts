import client from "../../client";
import { Resolvers } from "../../Users/types";

const resolvers: Resolvers = {
  Query: {
    seeHashtag: (_, { hashtag }) =>
      client.hashtag.findUnique({ where: { hashtag } }),
  },
};

export default resolvers;
