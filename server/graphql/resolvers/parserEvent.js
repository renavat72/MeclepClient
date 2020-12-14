const { UserInputError } = require('apollo-server');
const { NEW_PARSER_EVENT } = require('../../Subscriptions');

const ParserEvent = require('../../models/ParserEvent');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getParserEvents() {
      try {
        const parserEvents = await ParserEvent.find().sort({ createdAt: -1 });
        return parserEvents;
      } catch (err) {
        throw new Error(err);
      }
    },
    // async getPost(_, { postId }) {
    //   try {
    //     const post = await Post.findById(postId);
    //     if (post) {
    //       return post;
    //     } else {
    //       throw new Error('Post not found');
    //     }
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
  },
  Mutation: {
    async likeParserPost(_, { parserEventId } , context){
      const user= checkAuth(context);

      const parserEvent = await ParserEvent.findById(parserEventId);
      if(parserEvent){
        
        if(parserEvent.likes.find(like => like.userId === user.id)){
          parserEvent.likes = parserEvent.likes.filter(like => like.userId !== user.id);
        } else{
          parserEvent.likes.push({
            userId:user.id,
            firstName: user.firstName,
            secondName: user.secondName,
            createdAt: new Date().toISOString()
          })
        }
        await parserEvent.save();
        return parserEvent;
      } else throw new UserInputError('Parser event not found')
    }
  },
  Subscription:{
    newParserEvent:{
      subscribe: (_,__,{pubSub})=> pubSub.asyncIterator(NEW_PARSER_EVENT)
    }
  }
};