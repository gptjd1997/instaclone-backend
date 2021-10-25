import { gql } from "apollo-server-core";

export default gql`
  type followUserResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    followUser(username: String!): followUserResult!
  }
`;
