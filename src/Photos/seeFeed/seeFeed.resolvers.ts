import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeFeed: protectedResolver((_, { lastId }, { client, loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            { user: { followers: { some: { id: loggedInUser.id } } } },
            { userId: loggedInUser.id },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      })
    ),
  },
};

export default resolvers;
