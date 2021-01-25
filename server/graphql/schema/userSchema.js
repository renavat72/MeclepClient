const { gql } = require('apollo-server');

module.exports = gql`

type User {
    id: ID!
    email: String!
    token: String!
    firstName: String!
    secondName: String!
    password: String!
    images: [File]
    imagesPublicId: [String]
    coverImage: File
    coverImagePublicId: String
    notifications: [NotificationPayload]
    createdAt: String!
    followers: [Follow]
    following: [Follow]
    interests: [String]
  }
  type UserPayload {
    id: ID!
    firstName: String!
    secondName: String!
    email: String
    password: String
    images: [String]
    imagesPublicId: [String]
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
    interests: [String]
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
        userCoverImage:String
        userFirstName:String
        userSecondName: String
        follower: ID
        followerCoverImage:String
        followerFirstName:String
        followerSecondName: String
    }
    # type Images {
    #     id: ID!
    #     likes: Like
    #     image: File
    #     coverImagePublicId: String
    # }
  input UploadUserPhotoInput {
    id: ID!
    coverImage: Upload
    coverImagePublicId: String
    isCover: Boolean
  }
  input UploadUserPhotosInput {
    id: ID!
    images: Upload
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
    coverImageUser:String
    coverImageFollower:String
    firstNameFollower: String!
    secondNameFollower: String!
    firstNameUser: String!
    secondNameUser: String!
  }
  input DeleteFollowInput {
    id: ID!
  }
  

  type Query {
    getCurrentUser(userId: String!): UserPayload
    getUserProfile: UserPayload
    profilePage(userName: String!): User
    getUsers(userId:String!): [UserPayload]
    followingUser(userId:ID,searchQuery: String!): [UserPayload]
    followersUser(userId:ID, searchQuery: String!): [UserPayload]
    getAuthUser: UserPayload
    searchUsers(searchQuery: String!): [UserPayload]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    uploadUserPhoto(input:UploadUserPhotoInput!): UserPayload
    # uploadUserPhotos(input:UploadUserPhotosInput): UserPayload
    uploadUserPhotos(id:ID, images: Upload): UserPayload
    deleteUserPhotos(id:ID, imagesPublicId:String):UserPayload
    changeFirstName(currentFirstName: String!, newFirstName: String!): User!
    changeSecondName(currentSecondName: String! newSecondName: String!): User
    createFollow(input: CreateFollowInput!): Follow
    deleteFollow(input: DeleteFollowInput!): Follow
}
  type Subscription {
    isUserOnline(authUserId: String!, userId: String!): IsUserOnlinePayload

}
`
