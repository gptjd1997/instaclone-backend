import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { GraphQLUpload } from "graphql-upload";
import { Resolvers } from "../types";
import { uploadToS3 } from "../../shared/shared.utils";

console.log(process.cwd());

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  //아바타 변경요청이 있을 시
  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadToS3({
      file: avatar,
      loggedInUser,
      folderName: "avatars",
    });
  }

  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }

  const updateUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });

  if (updateUser.id) {
    return { ok: true };
  } else {
    return { ok: false, error: "프로필을 업데이트할 수 없습니다." };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
  Upload: GraphQLUpload,
};

export default resolvers;
