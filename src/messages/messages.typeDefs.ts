import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    createdAt: String!
    updatedAt: String!
    read: Boolean
  }
  type Room {
    id: Int!
    unreadTotal: Int!
    users: [User]!
    messages: [Message]!
    createdAt: String!
    updatedAt: String!
    count: Int!
  }
`;
