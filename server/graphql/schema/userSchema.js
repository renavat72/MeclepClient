const { gql } = require('apollo-server');

module.exports = gql`

type User {
    id: ID!
    email: String!
    token: String!
    firstName: String!
    secondName: String!
    password: String!
    image: File
    imagePublicId: String
    coverImage: File
    coverImagePublicId: String
    notifications: [NotificationPayload]
    createdAt: String!
    followers: [Follow]
    following: [Follow]
  }
  type UserPayload {
    id: ID!
    firstName: String!
    secondName: String!
    email: String
    password: String
    image: String
    imagePublicId: String
    coverImage: String
    coverImagePublicId: String
    isOnline: Boolean
    # posts: [PostPayload]
    likes: [Like]
    followers: [Follow]
    followersCount: Int!
    followingCount: Int!
    following: [Follow]
    notifications: [NotificationPayload]
    newNotifications: [NotificationPayload]
    newConversations: [ConversationsPayload]
    unseenMessage: Boolean
    createdAt: String
    updatedAt: String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
    type UsersPayload {
        users: [UserPayload]!
        count: String!
    }
    
    type IsUserOnlinePayload {
        userId: ID!
        isOnline: Boolean
    }
    type Follow {
        id: ID!
        user: ID
        follower: ID
    }

  input UploadUserPhotoInput {
    id: ID!
    image: Upload
    imagePublicId: String
    isCover: Boolean
  }
  input RegisterInput {
    firstName: String!
    secondName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input CreateFollowInput {
    userId: ID!
    followerId: ID!
  }
  input DeleteFollowInput {
    id: ID!
  }
  
  type Query {
    getCurrentUser(userId: String!): UserPayload
    getUserProfile: UserPayload
    profilePage(userName: String!): User
    getUsers(userId:String!): [UserPayload]
    followingUser: [UserPayload]
    followersUser: [UserPayload]
    getAuthUser: UserPayload
    searchUsers(searchQuery: String!): [UserPayload]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    uploadUserPhoto(input: UploadUserPhotoInput!): UserPayload!
    changeFirstName(currentFirstName: String!, newFirstName: String!): User!
    changeSecondName(currentSecondName: String! newSecondName: String!): User
    createFollow(input: CreateFollowInput!): Follow
    deleteFollow(input: DeleteFollowInput!): Follow
}
  type Subscription {
    isUserOnline(authUserId: ID!, userId: ID!): IsUserOnlinePayload

}
`
