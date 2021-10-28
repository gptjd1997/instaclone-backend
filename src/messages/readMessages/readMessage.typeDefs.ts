import { gql } from "apollo-server-core";
import MutationResponse from "../../shared/shared.typeDefs";

export default gql`
  type Mutation {
    readMessage(id: Int!): MutationResponse!
  }
`;
