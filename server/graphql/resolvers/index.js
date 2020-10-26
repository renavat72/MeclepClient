const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const messagesResolvers = require('./messages');


module.exports = {
    UserPayload:{
        followingCount: (parent) => parent.following.length,
        followersCount: (parent) => parent.followers.length

    },
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
        ...messagesResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...messagesResolvers.Mutation
    },
    Subscription:{
        ...postsResolvers.Subscription,
        ...usersResolvers.Subscription,
        ...messagesResolvers.Subscription
    }
}