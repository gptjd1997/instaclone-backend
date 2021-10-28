import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const ok = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!ok) {
          return { ok: false, error: "댓글이 존재하지 않습니다." };
        } else if (ok.userId !== loggedInUser.id) {
          return { ok: false, error: "자신의 댓글이 아닙니다." };
        }
        await client.comment.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};
export default resolvers;
