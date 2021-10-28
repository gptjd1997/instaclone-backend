import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { client, loggedInUser }) => {
        let room = null;

        if (userId) {
          const user = await client.user.findUnique({
            where: { id: userId },
            select: { id: true },
          });
          if (!user) {
            return { ok: false, error: "존재하지 않는 유저입니다." };
          }

          room = await client.room.create({
            data: {
              users: { connect: [{ id: userId }, { id: loggedInUser.id }] },
            },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: { id: roomId },
            select: { id: true, count: true },
          });

          if (!room) {
            return {
              ok: false,
              error: "대화방을 찾을 수 없습니다.",
            };
          }
        }
        await client.room.update({
          where: { id: room.id },
          data: { count: room.count + 1 },
        });
        await client.message.create({
          data: {
            payload,
            room: { connect: { id: room.id } },
            user: { connect: { id: loggedInUser.id } },
          },
        });

        return { ok: true };
      }
    ),
  },
};

export default resolvers;
