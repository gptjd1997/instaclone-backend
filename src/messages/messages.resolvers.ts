import client from "../client";

export default {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: { roomId: id },
        orderBy: { createdAt: "desc" },
      }),
    unreadTotal: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }

      return await client.message.count({
        where: { read: false, roomId: id, userId: { not: loggedInUser.id } },
      });
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
