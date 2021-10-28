import { Resolvers } from "../../Users/types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (
      _,
      { photoId, lastId },
      { client, loggedInUser }
    ) =>
      client.comment.findMany({
        where: { photoId },
        skip: lastId ? 1 : 0,
        take: 5,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: "asc" },
      }),
  },
};

export default resolvers;
