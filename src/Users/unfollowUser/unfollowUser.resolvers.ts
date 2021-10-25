import { Resolvers } from "../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const ok = await client.user.findUnique({ where: { username } });
        if (!ok) {
          return { ok: false, error: "존재하지 않는 유저입니다." };
        }

        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: { disconnect: { username } },
          },
        });

        return { ok: true };
      }
    ),
  },
};

export default resolvers;
