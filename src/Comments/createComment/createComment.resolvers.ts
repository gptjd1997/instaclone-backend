import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (_, { payload, photoId }, { client, loggedInUser }) => {
        const ok = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });

        if (!ok) {
          return { ok: false, error: "존재하지 않는 사진입니다." };
        }
        await client.comment.create({
          data: {
            payload,
            photo: { connect: { id: photoId } },
            user: { connect: { id: loggedInUser.id } },
          },
        });

        return { ok: true };
      }
    ),
  },
};

export default resolvers;
