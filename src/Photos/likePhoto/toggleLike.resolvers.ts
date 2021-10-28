import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { photoId }, { client, loggedInUser }) => {
        const userId = loggedInUser.id;
        const ok = await client.photo.findUnique({ where: { id: photoId } });

        if (!ok) {
          return { ok: false, error: "사진을 찾을수 없습니다." };
        }

        ///like Where 반복사용 변수
        const likeWhere = {
          where: { photoId_userId: { photoId, userId } },
        };

        const like = await client.like.findUnique(likeWhere);
        console.log(like);
        if (!like) {
          await client.like.create({
            data: {
              photo: { connect: { id: photoId } },
              user: { connect: { id: userId } },
            },
          });
          return { ok: true, toggle: "liked" };
        } else {
          await client.like.delete(likeWhere);
          return { ok: true, toggle: "unLiked" };
        }

        //
      }
    ),
  },
};

export default resolvers;
