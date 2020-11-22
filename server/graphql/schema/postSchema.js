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
    image: File
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
  input InfoPost {
    timeOfEvent: String!
    typeOfEvent: String!
    nameOfEvent: String!
    aboutOfEvent: String!
    privateEvent: Boolean
    notifyFriends: Boolean
    adultEvent: Boolean
    imagePublicId: String
    image: Upload
  }
  input LocationOfEvent{
      address:String
      lat: Float
      lng: Float
    }
  type Query {
    searchPost(searchQuery: String!): [Post]
    filterTypePost(searchQuery: String!): [Post]
    getPosts: [Post]
    getPost(postId: ID!): Post
    getParserEvents:[ParserEvent]

  }
  type Mutation {
    createPost(infoPost: InfoPost, locationOfEvent:LocationOfEvent): PostPayload
    deletePost(postId: ID!): PostPayload
    likePost(postId: String!): Post!
    createComment(postId: String!, body: String!):Post!
    deleteComment(postId:ID!, commentId: ID!): Post!
    createParserEvent(input:InfoParserEvent):ParserEvent!
  }
  type Subscription {
    newPost: Post!
    newParserEvent: ParserEvent!
  }
`