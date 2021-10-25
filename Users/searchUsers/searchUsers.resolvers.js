import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      const users = await client.user.findMany({
        where: { username: { startsWith: keyword.toLowerCase() } },
        skip: 5 * (page - 1),
        take: 5,
      });
      return users;
    },
  },
};
