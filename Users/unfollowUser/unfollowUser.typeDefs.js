import { gql } from "apollo-server-core";

export default gql`
  type unfollowUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollowUser(username: String!): unfollowUserResult!
  }
`;
