import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeRooms: protectedResolver(
      (_, { lastId, take }, { loggedInUser, client }) => {
        return client.room.findMany({
          where: { users: { some: { id: loggedInUser.id } } },
          take: 5,
          skip: lastId ? lastId : 0,
          ...(lastId && { cursor: { id: lastId } }),
          orderBy: { updatedAt: "desc" },
        });
      }
    ),
  },
};

export default resolvers;
