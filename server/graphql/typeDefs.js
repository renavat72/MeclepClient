const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    userId: String
    createdAt: String!
    firstname: String!
    secondname: String!
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
    imagesOfEvent: String
    locationOfEvent: String!
    infoPost: String
  }
  input InfoPost {
    timeOfEvent: String!
    typeOfEvent: String!
    nameOfEvent: String!
    aboutOfEvent: String!
    privateEvent: Boolean
    notifyFriends: Boolean
    adultEvent: Boolean
    imagesOfEvent: String
  }
  input LocationOfEvent{
      address:String
      lat: Float
      lng: Float
    }
  type Comment{
    id: ID!
    createdAt: String!
    firstname: String!
    secondname: String!
    body: String!
  }
  type Like{
    id: ID!
    createdAt: String!
    firstname: String!
    secondname: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    firstname: String!
    secondname: String!
    password: String!
    profileImage: String
    createdAt: String!
  }
  type Message {
    uuid: String!
    createdAt: String!
    content: String!
    from: String!
    to: String!
  }
  input RegisterInput {
    firstname: String!
    secondname: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getCurrentUser: User
    getUserProfile: User
    profilePage(userName: String!): User
    getMessages(from: String!):[Message!]
    getUsers: [User]!
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
        createPost(infoPost: InfoPost, locationOfEvent:LocationOfEvent): Post!
        deletePost(postId: ID!): String!
        likePost(postId: ID!): Post!
        changeFirstname(currentFirstname: String!, newFirstname: String!): User!
        changeSecondname(currentSecondname: String! newSecondname: String!): User
        createComment(postId: String!, body: String!):Post!
        deleteComment(postId:ID!, commentId: ID!): Post!
        sendMessage(to:String! content:String!): Message!
 }
    type Subscription{
      newPost: Post!
   }
`;