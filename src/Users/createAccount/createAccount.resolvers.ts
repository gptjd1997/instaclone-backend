import client from "../../client";
import bcrypt from "bcrypt";

import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Mutation: {
    //계정 생성
    createAccount: async (
      _,
      { firstName, lastName, username, email, password, avatar }
    ) => {
      try {
        let avatarUrl = null;
        // username OR email 이 이미 DB에 존재하는지 확인
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        console.log(existingUser);
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }

        // 패스워드 hash화
        const uglyPassword = await bcrypt.hash(password, 10);
        console.log(uglyPassword);

        //  유저 생성
        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
        console.log(username);
        return { ok: true };
      } catch (e) {
        return { ok: false, error: e };
      }
    },
  },
};

export default resolvers;
