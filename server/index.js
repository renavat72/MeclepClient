const mongoose = require('mongoose');
const {} = require('dotenv/config');
const express = require('express')
const cors = require('cors')
const { createServer } = require(`http`)

const { MONGODB } = require(`../config.js`)
const {apolloServer} = require('./util/apolloServer')
const typeDefs = require ('./graphql/schema')
const resolvers = require ('./graphql/resolvers')
const models = require ('./models')

mongoose.connect(MONGODB,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,})
.then(()=>{
    console.log('MongoDB Connected');
})

const app = express();

const corsOptions = {
  origin:`http://localhost:3000`,
  credentials: true,
};
app.use(cors(corsOptions));

const server = apolloServer(typeDefs, resolvers, models);
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || process.env.API_PORT;
httpServer.listen({ port: PORT }, () => {
  console.log(`server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});