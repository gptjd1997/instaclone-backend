import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    //계정 생성
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
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
        const newUser = client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        return { ok: true };
      } catch (e) {
        return { ok: false, error: e };
      }
    },
  },
};