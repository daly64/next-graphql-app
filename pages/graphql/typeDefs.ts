import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Message {
    id: ID!
    text: String!
  }

  type Mutation {
    createMessage(text: String!): Message
    updateMessage(id: ID!, text: String!): Message
    deleteMessage(id: ID!): Message
  }
  type Query {
    messages: [Message!]
    message(id: ID!): Message
  }
  type Subscription {
    messages: [Message!]
  }
`;
