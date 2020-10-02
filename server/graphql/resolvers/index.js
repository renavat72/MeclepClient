const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const messageResolvers = require('./messages');


module.exports = {
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString(),
      },
    Post:{
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query,
        // ...messagesResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...messageResolvers.Mutation
    },
    Subscription:{
        ...postsResolvers.Subscription
    }
}