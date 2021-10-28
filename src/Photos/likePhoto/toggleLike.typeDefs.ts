import { gql } from "apollo-server-core";

export default gql`
  type ToggleLikeResult {
    ok: Boolean!
    error: String
    toggle: String
  }

  type Mutation {
    toggleLike(photoId: Int!): ToggleLikeResult!
  }
`;
