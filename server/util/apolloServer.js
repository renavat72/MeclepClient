const {ApolloServer} = require('apollo-server-express');
const {PubSub} = require('apollo-server');
const jwt = require('jsonwebtoken');
const {} = require('dotenv/config');

const IS_USER_ONLINE =require('../Subscriptions')
const { SECRET_KEY } = require('../../config');

const pubSub = new PubSub();



const apolloServer =  (typeDefs, resolvers, models) =>  {
    return new ApolloServer({
      typeDefs,
    resolvers,
    context:({req})=>({req, pubSub}),

    subscriptions: {
      onConnect: async (context) => {
        if(context.Authorization){
          const token = context.Authorization.split('Bearer ')[1];
          const user = jwt.verify(token, SECRET_KEY);
          pubSub.publish("IS_USER_ONLINE", {
            isUserOnline: {
              userId: user.id,
              isOnline: true,
            },
          });

          return {
            authUser: user,
          };
        }
      },
    
        onDisconnect: async (webSocket, context) => {
          const c =  context.initPromise;
          if (c && c.authUser) {
            pubSub.publish("IS_USER_ONLINE", {
              isUserOnline: {
                userId: c.authUser.id,
                isOnline: false,
              },
            });
            await models.User.findOneAndUpdate(
              { email: c.authUser.email },
              {
                isOnline: false,
              }
            );
          }
        },
      },
})};

module.exports={
    apolloServer
}