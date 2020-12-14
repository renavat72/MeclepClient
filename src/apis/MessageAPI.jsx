import gql from 'graphql-tag'

export const GET_CONVERSATIONS = gql`
   query($authUserId: ID!){
    getConversations(authUserId: $authUserId){
        id
        firstName
        secondName
        isOnline
        lastMessage
        lastMessageCreatedAt
        lastMessageSender
    }
   }
`
export const GET_CONVERSATIONS_SUBSCRIPTION = gql`
   subscription{
    newConversation{
        id
        firstName
        secondName
        isOnline
        lastMessage
        lastMessageCreatedAt
        lastMessageSender
    }
   }
`
export const GET_MESSAGES_SUBSCRIPTION = gql`
  subscription($authUserId: ID!, $userId: ID!) {
    messageCreated(authUserId: $authUserId, userId: $userId) {
      id
      receiver {
        id
        firstName
        secondName
        createdAt
      }
      sender {
        id
        firstName
        secondName
        createdAt
      }
      message
      seen
      createdAt
    }
  }
`;
export const GET_MESSAGES = gql`
   query($authUserId: ID! $userId: ID!){
    getMessages(authUserId: $authUserId, userId: $userId){
        id
        receiver{
            id
            firstName
            secondName
        }
        sender{
            id
            firstName
            secondName
        }
        message
        seen

    }
   }
`
export const UPDATE_MESSAGE_SEEN = gql`
  mutation($input: UpdateMessageSeenInput!) {
    updateMessageSeen(input: $input)
  }
`;

export const CREATE_MESSAGE = gql`
  mutation($input: CreateMessageInput!) {
    createMessage(input: $input){
      id
      isFirstMessage
    }
  }
`;