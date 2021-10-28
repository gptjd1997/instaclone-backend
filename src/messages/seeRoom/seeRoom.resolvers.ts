import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeRoom: protectedResolver(async (_, { id }, { client, loggedInUser }) =>
      client.room.findFirst({
        where: { id, users: { some: { id: loggedInUser.id } } },
      })
    ),
  },
};

export default resolvers;
