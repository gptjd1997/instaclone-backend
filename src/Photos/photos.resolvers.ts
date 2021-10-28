import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
    likes: ({ id }) => client.like.count({ where: { photoId: id } }),
    comments: ({ id }) => client.comment.count({ where: { photoId: id } }),
    isMine: ({ userId }, _, { loggedInUser }) => userId === loggedInUser?.id,
  },

  Hashtag: {
    photos: ({ id }, { page }) => {
      return client.photo.findMany({
        where: { hashtag: { some: { id } } },
        skip: 5 * (page - 1),
        take: 5,
      });
    },
    totalPhotos: ({ id }) =>
      client.photo.count({ where: { hashtag: { some: { id } } } }),
  },
};
