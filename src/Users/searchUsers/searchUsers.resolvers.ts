import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, page }, { client }) => {
      const users = await client.user.findMany({
        where: { username: { startsWith: keyword.toLowerCase() } },
        skip: 5 * (page - 1),
        take: 5,
      });
      return users;
    },
  },
};

export default resolvers;
