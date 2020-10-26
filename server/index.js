const {ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');
const {} = require('dotenv/config');

const { createServer } = require ('http');

const typeDefs = require ('./graphql/typeDefs')
const resolvers = require ('./graphql/resolvers')
const { MONGODB } = require(`../config.js`)
const checkAuth = require('./util/check-auth');

const pubSub = new PubSub();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req, pubSub}),
    subscriptions: {
        onConnect: async (context, webSocket) => {
          // Check if user is authenticated
          if (context) {
            const user = await checkAuth(context);
  
            // Publish user isOnline true
            pubSub.publish(IS_USER_ONLINE, {
              isUserOnline: {
                userId: user.id,
                isOnline: true,
              },
            });
  
            // Add authUser to socket's context, so we have access to it, in onDisconnect method
            return {
              authUser: user,
            };
          }
        },
        onDisconnect: async (webSocket, context) => {
          // Get socket's context
          const c = await context.initPromise;
          if (c && c.authUser) {
            // Publish user isOnline false
            pubSub.publish(IS_USER_ONLINE, {
              isUserOnline: {
                userId: c.authUser.id,
                isOnline: false,
              },
            });
  
            // Update user isOnline to false in DB
            await models.User.findOneAndUpdate(
              { email: c.authUser.email },
              {
                isOnline: false,
              }
            );
          }
        },
      },
    
});

mongoose.connect(MONGODB,{ useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,})
.then(()=>{
    console.log('MongoDB Connected');
    return server.listen({port: 5000});
})
.then(res =>{
    console.log(`Server running at ${res.url}`)
})