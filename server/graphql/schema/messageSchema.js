const { gql } = require('apollo-server');

module.exports = gql`
  type Message {
    id: ID!
    sender: User!
    receiver: User!
    message: String!
    createdAt: String
    updateAt: String
  }
  type SuccessMessage {
    message: String!
  }
  type MessagePayload {
    id: ID!
    receiver: UserPayload
    sender: UserPayload
    message: String
    seen: Boolean
    createdAt: String
    isFirstMessage: Boolean
  }
  type ConversationsPayload {
    id: ID!
    firstName: String!
    secondName: String!
    image: String
    isOnline: Boolean
    seen: Boolean
    lastMessage: String
    lastMessageSender: Boolean
    lastMessageCreatedAt: String
  }
  input UpdateMessageSeenInput {
    sender: ID
    receiver: ID!
  }
  input CreateMessageInput {
    sender: ID!
    receiver: ID!
    message: String!
  }

type Query {
    getMessages(authUserId: ID!, userId: ID): [MessagePayload]
    getConversations(authUserId: ID!): [ConversationsPayload]
}
  type Mutation {
    createMessage(input: CreateMessageInput!): MessagePayload
    updateMessageSeen(input: UpdateMessageSeenInput!): Boolean
}
type Subscription {
    messageCreated(authUserId: ID!, userId: ID): MessagePayload
    newConversation: ConversationsPayload
}

`