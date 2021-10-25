import client from "../../client";

import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "유저를 찾을수 없습니다",
        };
      }

      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: 5 * (page - 1),
        });

      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
export default resolvers;
