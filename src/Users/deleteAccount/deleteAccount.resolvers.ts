import { Resolvers } from "../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deleteAccount: protectedResolver((_, __, { client, loggedInUser }) =>
      client.user.delete({ where: { id: loggedInUser.id } })
    ),
  },
};

export default resolvers;
