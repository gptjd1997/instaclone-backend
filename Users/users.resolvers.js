import client from "../client";
import { protectedResolver } from "./users.utils";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    isMe: protectedResolver(
      ({ id }, _, { loggedInUser }) => id === loggedInUser.id
    ),
    isFollowing: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: { username: loggedInUser.username, following: { some: { id } } },
      });
      console.log(exists);
      return Boolean(exists);
    }),
  },
};
