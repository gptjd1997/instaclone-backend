import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Mutation: {
    //로그인
    login: async (_, { username, password }) => {
      // 유저 찾기
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "유저를 찾지 못함",
        };
      }

      // 패스워드 검증
      const passwordOk = await bcrypt.compare(
        password,
        user.password /*ugly password*/
      );

      if (!passwordOk) {
        return {
          ok: false,
          error: "잘못된 패스워드 입니다.",
        };
      }

      // 검증 완료 시 토큰 발행
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
