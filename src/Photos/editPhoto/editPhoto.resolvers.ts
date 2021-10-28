import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";
import { generateHashtags } from "../photos.utils";

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { client, loggedInUser }) => {
        const oldPhoto = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          include: { hashtag: { select: { hashtag: true } } },
        });

        if (!oldPhoto) {
          return { ok: false, error: "본인이 아닙니다." };
        } else {
          await client.photo.update({
            where: { id },
            data: {
              caption,
              hashtag: {
                disconnect: oldPhoto.hashtag,
                connectOrCreate: generateHashtags(caption),
              },
            },
          });
          return { ok: true };
        }
      }
    ),
  },
};

export default resolvers;
