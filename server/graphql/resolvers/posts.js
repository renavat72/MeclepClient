const { AuthenticationError, UserInputError } = require('apollo-server');
const { uploadToCloudinary, deleteFromCloudinary } = require ('../../util/cloudinary');
const { pubSub, NEW_POST } = require('../../Subscriptions');

const Post = require('../../models/Post');
const ParserEvent = require('../../models/ParserEvent');

const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async searchPost(_,{searchQuery}, context){
      const authUser = checkAuth(context);
      if(!searchQuery){
        return [];
      }
      const posts= Post.find({
        $or: [{ nameOfEvent: new RegExp(searchQuery, 'i') }],
          _id: {
            $ne: authUser.id,
          },
        }).limit(50);
        return posts;
    },
    async filterTypePost(_,{searchQuery}, context){
      const authUser = checkAuth(context);
      if(!searchQuery){
        return [];
      }
      const postsType= Post.find({
        $or: [{ typeOfEvent: new RegExp(searchQuery, 'i') }],
          _id: {
            $ne: authUser.id,
          },
        }).limit(50);
        return postsType;
    },
  },
  Mutation: {
    async createPost(_, { 
        infoPost: {
        typeOfEvent,
        timeOfEvent,
        locationOfEvent,
        nameOfEvent,
        aboutOfEvent,
        infoPost,
        privateEvent,
        notifyFriends,
        adultEvent,
        image,
      },
        locationOfEvent:{
         address,
         lat,
         lng
        }
       }, context) {
      const user = checkAuth(context);

      let imageUrl, imagePublicId;
      if (image) {
        const { createReadStream } = await image;
        const stream = createReadStream();
        const uploadImage = await uploadToCloudinary(stream, 'events');
  
        if (!uploadImage.secure_url) {
          throw new Error('Something went wrong while uploading image to Cloudinary');
        }
  
        imageUrl = uploadImage.secure_url;
        imagePublicId = uploadImage.public_id;
      }
      const newPost = new Post({
        typeOfEvent,
        infoPost,
        timeOfEvent,
        locationOfEvent,
        nameOfEvent,
        aboutOfEvent,
        address,
        lat,
        lng,
        privateEvent,
        notifyFriends,
        adultEvent,
        image: imageUrl,
        imagePublicId,
        userId: user.id,
        firstName: user.firstName,
        secondName: user.secondName,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();
      pubSub.publish(NEW_POST,{
        newPost: post
      })

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      const post = await Post.findById(postId);

      try {
        if (user.id === post.userId) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_,{postId}, context){
      const user= checkAuth(context);

      const post = await Post.findById(postId)
      if(post){
        if(post.likes.find(like => like.userId === user.id)){
          post.likes = post.likes.filter(like => like.userId !== user.id);
        } else{
          post.likes.push({
            userId:user.id,
            firstName: user.firstName,
            secondName: user.secondName,
            createdAt: new Date().toISOString()
          })
        }

        await post.save();
        return post;
      } else throw new UserInputError('Post not found')
    }
  },
  Subscription:{
    newPost:{
      subscribe: (_,__,{pubSub})=> pubSub.asyncIterator(NEW_POST)
    }
  }
};