const { gql } = require('apollo-server');

module.exports = gql`

type Post {
    id: ID!
    userId: String
    createdAt: String!
    firstName: String!
    secondName: String!
    likes: [Like]!
    # likeCount: Int!
    commentCount: Int!
    comments: [Comment]!
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
    image: [File]
    imagePublicId: [String]
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
    # likeCount: [Like]!
    commentCount: Int!
    comments: [Comment]!
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
    image: [String]
    imagePublicId: [String]
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
    imagePublicId: [String]
    image: Upload

  }
  input LocationOfEvent{
      address:String
      lat: Float
      lng: Float
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
    createdAt: String!
    title: String!
    isOnline: Boolean
    headerDescription: String!
    urlContent:String!
    description: String!
    time: String
    period: String
    typeOfEvent: String
    website: String
    images:[String]
    city: String
    address: String!
    lat: Float
    lng: Float
    likes: [Like]!
    # infoParserEvent: String
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
    searchPost(searchQuery: String!): [Post]
    filterTypePost(searchQuery: String!): [Post]
    getPosts(limit:Int, skip: Int, first: Int, after:String): [PostPayload]
    getPost(postId: ID!): PostPayload
    getParserEvents(limit:Int, skip: Int, first: Int, after:String):[ParserEvent]

  }
  type Mutation {
    createPost(infoPost: InfoPost, locationOfEvent:LocationOfEvent): PostPayload
    deletePost(postId: ID!): PostPayload
    likeParserPost(parserEventId: String!): ParserEvent!
    likePost(postId: String!): PostPayload!
    createComment(postId: String!, body: String!):Post!
    deleteComment(postId:ID!, commentId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
    newParserEvent: ParserEvent!
  }
`