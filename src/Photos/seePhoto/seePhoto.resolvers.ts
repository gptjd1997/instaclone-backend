import { Resolvers } from "../../Users/types";

const resolvers: Resolvers = {
  Query: {
    seePhoto: (_, { id }, { client }) =>
      client.photo.findUnique({ where: { id } }),
  },
};

export default resolvers;
