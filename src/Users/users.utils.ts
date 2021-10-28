import jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "./types";

//헤더의 토큰을 이용해 받아오는 함수
export const getUser = async (token) => {
  //현재 http 헤더에서 토큰을 받아온다.
  try {
    if (!token) {
      return null;
    }

    // 토큰과 .env 의 시크릿 를 이용해서 토큰을 검증해 토큰에 들어있는 id값을 받아온다.
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);

    // 받아온 id를 이용해 데이터 베이스에서 유저 정보를 가지고온다.
    const user = await client.user.findUnique({ where: { id } });

    //유저가 존재한다면 유저를 반환 아니라면 null을 반환
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

//인증이 필요한 resolver를 보호해줄 함수
export const protectedResolver =
  //Resolver 형식의 arguments를 가짐      #src/Users/types.d.ts
  /// type Resolver = (
  ///   root: any,
  ///   args: any,
  ///   context: Context,
  ///   info: any
  /// ) => any;
  (ourResolver: Resolver) => (root, args, context, info) => {
    //context에 로그인 유저에 대한 정보가 없을 시
    //Query라면 null을 반환 Mutation이면 MutationResult인 ok,error 형식의 객체를 반환
    if (!context.loggedInUser) {
      //info에는 Query인지 Mutation인지 등등에 대한 정보가 담겨있음
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      }
      return {
        ok: false,
        error: "로그인이 필요합니다.",
      };
    }

    return ourResolver(root, args, context, info);
  };
