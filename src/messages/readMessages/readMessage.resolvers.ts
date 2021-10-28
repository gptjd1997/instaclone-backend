import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    readMessage: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        await client.message.updateMany({
          where: { roomId: id, userId: { not: loggedInUser.id } },
          data: { read: true },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
