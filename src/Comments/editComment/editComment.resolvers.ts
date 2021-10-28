import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { client, loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment) {
          return { ok: false, error: "존재하지 않는 댓글입니다." };
        } else if (comment.userId !== loggedInUser.id) {
          return { ok: false, error: "자신의 댓글이 아닙니다." };
        }
        await client.comment.update({ where: { id }, data: { payload } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
