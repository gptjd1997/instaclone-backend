import { Resolvers } from "../../Users/types";

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: (_, { id }, { client }) =>
      client.user.findMany({
        where: { likes: { some: { photoId: id } } },
        select: { username: true },
      }),
  },
};

export default resolvers;
