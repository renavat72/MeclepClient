const { AuthenticationError, UserInputError } = require('apollo-server');
const { uploadToCloudinary, deleteFromCloudinary } = require ('../../util/cloudinary');
const { pubSub, NEW_PARSER_EVENT } = require('../../Subscriptions');

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
    async createParserEvent(_, { 
        input: {
            title,
            headerDescription,
            urlContent,
            description,
            time,
            period,
            typeOfEvent,
            address
      }}) {


      const NewParserEvent = new ParserEvent({
        title,
        headerDescription,
        urlContent,
        description,
        time,
        period,
        typeOfEvent,
        address,
        createdAt: new Date().toISOString()
      });

      const parserEvent = await NewParserEvent.save();

      pubSub.publish(NEW_PARSER_EVENT,{
        newPost: parserEvent
      })

      return parserEvent;
    },

  },
  Subscription:{
    newParserEvent:{
      subscribe: (_,__,{pubSub})=> pubSub.asyncIterator(NEW_PARSER_EVENT)
    }
  }
};