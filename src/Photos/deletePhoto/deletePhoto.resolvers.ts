import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!photo) {
          return { ok: false, error: "사진을 찾지 못했습니다." };
        } else if (photo.userId !== loggedInUser.id) {
          return { ok: false, error: "자신의 사진이 아닙니다." };
        }
        await client.photo.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
