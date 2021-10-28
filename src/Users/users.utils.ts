import jwt from "jsonwebtoken";
import client from "../client";
import { Resolver, Resolvers } from "./types";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY); //토큰 확인
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: Resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
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
