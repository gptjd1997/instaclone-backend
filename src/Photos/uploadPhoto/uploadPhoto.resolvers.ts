import { Resolvers } from "../../Users/types";
import { protectedResolver } from "../../Users/users.utils";
import { generateHashtags } from "../photos.utils";
import { createWriteStream } from "fs";
import { uploadToS3 } from "../../shared/shared.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        let hashtagsObj = null;
        if (caption) {
          hashtagsObj = generateHashtags(caption);
        }

        const fileUrl = await uploadToS3({
          file,
          loggedInUser,
          folderName: "uploads",
        });

        return await client.photo.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            file: fileUrl,
            caption,
            ...(hashtagsObj.length > 0 && {
              hashtag: { connectOrCreate: hashtagsObj },
            }),
          },
        });

        //save the photo WITH the parsed hashtags

        //add the photo to the hashtags
      }
    ),
  },
};

export default resolvers;
