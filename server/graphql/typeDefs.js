const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    userId: String
    createdAt: String!
    firstName: String!
    secondName: String!
    likes: [Like]!
    likeCount: Int!
    comments: [Comment]!
    commentCount: Int!
    timeOfEvent: String!
    typeOfEvent: String!
    nameOfEvent: String!
    aboutOfEvent: String!
    address:String!
    lat: Float
    lng: Float
    privateEvent: Boolean
    notifyFriends: Boolean
    adultEvent: Boolean
    image: String
    imagePublicId: String
    locationOfEvent: String!
    infoPost: String
  }
  type PostPayload {
    id: ID!
    userId: String
    createdAt: String!
    firstName: String!
    secondName: String!
    likes: [Like]!
    likeCount: Int!
    comments: [Comment]!
    commentCount: Int!
    timeOfEvent: String!
    typeOfEvent: String!
    nameOfEvent: String!
    aboutOfEvent: String!
    address:String!
    lat: Float
    lng: Float
    privateEvent: Boolean
    notifyFriends: Boolean
    adultEvent: Boolean
    image: String
    imagePublicId: String
    locationOfEvent: String!
    infoPost: String
  }
  type ParserEvent {
    id: ID!
    createdAt: String
    title: String!
    headerDescription: String!
    urlContent:String!
    description: String!
    time: String
    period: String
    typeOfEvent: String
    address: String!
    infoParserEvent: String
  }
  
  type Comment{
    id: ID!
    createdAt: String!
    firstName: String!
    secondName: String!
    body: String!
  }
  type Like{
    id: ID!
    userId: String!
    createdAt: String!
    firstName: String!
    secondName: String!
  }


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

  enum NotificationType {
    LIKE
    FOLLOW
    COMMENT
  }
  enum NotificationOperationType {
    CREATE
    DELETE
  }

  type Notification {
    id: ID!
    user: User
    author: User
    post: ID!
    follow: Follow
    type: NotificationType
    seen: Boolean
    createdAt: String
  }
  type NotificationPayload {
    id: ID
    user: UserPayload
    author: UserPayload
    follow: Follow
    createdAt: String
  }
  type NotificationsPayload {
    count: String!
    notifications: [NotificationPayload]!
  }
  type NotificationCreatedOrDeletedPayload {
    operation: NotificationOperationType!
    notification: NotificationPayload
  }

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

  input RegisterInput {
    firstName: String!
    secondName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input CreateMessageInput {
    sender: ID!
    receiver: ID!
    message: String!
  }
  input UploadUserPhotoInput {
    id: ID!
    image: Upload!
    imagePublicId: String
    isCover: Boolean
  }

  input InfoPost {
    timeOfEvent: String!
    typeOfEvent: String!
    nameOfEvent: String!
    aboutOfEvent: String!
    privateEvent: Boolean
    notifyFriends: Boolean
    adultEvent: Boolean
    image: Upload
  }
  input LocationOfEvent{
      address:String
      lat: Float
      lng: Float
    }
  input CreateFollowInput {
    userId: ID!
    followerId: ID!
  }
  input DeleteFollowInput {
    id: ID!
  }
  input CreateNotificationInput {
    userId: ID!
    authorId: ID!
    postId: ID
    notificationType: NotificationType!
    notificationTypeId: ID
  }
  input DeleteNotificationInput {
    id: ID!
  }

  input InfoParserEvent{
    title: String
    headerDescription: String
    urlContent:String
    description: String
    time: String
    period: String
    typeOfEvent: String
    address: String
  }

  type Query {
    getParserEvents:[ParserEvent]
    searchPost(searchQuery: String!): [Post]
    filterTypePost(searchQuery: String!): [Post]
    getMessages(authUserId: ID!, userId: ID!): [MessagePayload]
    getConversations(authUserId: ID!): [ConversationsPayload]
    getCurrentUser(userId: String!): UserPayload
    getUserProfile: UserPayload
    profilePage(userName: String!): User
    getUsers(userId:String!): [UserPayload]
    followingUser: [UserPayload]
    followersUser: [UserPayload]
    getAuthUser: UserPayload
    getPosts: [Post]
    getPost(postId: ID!): Post
    createNotification(input: CreateNotificationInput!): Notification
    deleteNotification(input: DeleteNotificationInput!): Notification
    searchUsers(searchQuery: String!): [UserPayload]

  }
    type Mutation{
        createParserEvent(input:InfoParserEvent):ParserEvent!
        createMessage(input: CreateMessageInput!): MessagePayload
        updateMessageSeen(input: UpdateMessageSeenInput!): Boolean
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
        createPost(infoPost: InfoPost, locationOfEvent:LocationOfEvent): PostPayload
        deletePost(postId: ID!): PostPayload
        likePost(postId: String!): Post!
        uploadUserPhoto(input: UploadUserPhotoInput!): UserPayload
        changeFirstName(currentFirstName: String!, newFirstName: String!): User!
        changeSecondName(currentSecondName: String! newSecondName: String!): User
        createComment(postId: String!, body: String!):Post!
        deleteComment(postId:ID!, commentId: ID!): Post!
        createFollow(input: CreateFollowInput!): Follow
        deleteFollow(input: DeleteFollowInput!): Follow
 }
    type Subscription{
      newPost: Post!
      newParserEvent: ParserEvent!
      messageCreated(authUserId: ID!, userId: ID!): MessagePayload
      newConversation: ConversationsPayload
      isUserOnline(authUserId: ID!, userId: ID!): IsUserOnlinePayload
      notificationCreatedOrDeleted: NotificationCreatedOrDeletedPayload
   }
`;