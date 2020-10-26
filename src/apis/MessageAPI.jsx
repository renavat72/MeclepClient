import gql from 'graphql-tag'

export const GET_CONVERSATIONS = gql`
   query($authUserId: ID!){
    getConversations(authUserId: $authUserId){
        id
        firstName
        secondName
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
    }
   }
`
export const UPDATE_MESSAGE_SEEN = gql`
  mutation($input: UpdateMessageSeenInput!) {
    updateMessageSeen(input: $input)
  }
`;