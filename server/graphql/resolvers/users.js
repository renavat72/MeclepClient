const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError, PubSub, withFilter} = require('apollo-server')
const mongoose = require('mongoose');

const checkAuth = require('../../util/check-auth');
const IS_USER_ONLINE  = require ('../../Subscriptions');
const {validateRegisterInput, validateLoginInput} = require ('../../util/validators')
const {SECRET_KEY} = require('../../../config')
const User = require('../../models/User');
const Message = require('../../models/Message');
const Follow = require('../../models/Follow');
// const Notification = require('../../models/Notification');
const { uploadToCloudinary, deleteFromCloudinary } =require ('../../util/cloudinary');

function generateToken(user){
  return jwt.sign({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      secondName: user.secondName
      
  }, SECRET_KEY,  {expiresIn: '1y'}
 );
}
const pubsub = new PubSub();

module.exports = {
    Query: {
        async getAuthUser(root, args, context){
          const authUser = checkAuth(context);

          if (!authUser) return null;

          const user = await User.findOneAndUpdate(
            { email: authUser.email },
            { isOnline: true }
          )
            .populate({ path: 'posts', options: { sort: { createdAt: 'desc' } } })
            .populate('likes')
            .populate('followers')
            .populate('following')
            .populate({
              path: '.../../models/Notification',
              populate: [
                { path: 'author' },
                { path: 'follow' },
                { path: 'like', populate: { path: 'post' } },
                { path: 'comment', populate: { path: 'post' } },
              ],
              match: { seen: false },
            });

          // user.newNotifications = user.notifications;

          const lastUnseenMessages = await Message.aggregate([
            {
              $match: {
                receiver: mongoose.Types.ObjectId(authUser.id),
                seen: false,
              },
            },
            {
              $sort: { createdAt: -1 },
            },
            {
              $group: {
                _id: '$sender',
                doc: {
                  $first: '$$ROOT',
                },
              },
            },
            { $replaceRoot: { newRoot: '$doc' } },
            {
              $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'sender',
              },
            },
          ]);

          // Transform data
          const newConversations = [];
          lastUnseenMessages.map(u => {
            const user = {
              id: u.sender[0]._id,
              firstName: u.sender[0].firstName,
              secondName: u.sender[0].secondName,
              image: u.sender[0].image,
              lastMessage: u.message,
              lastMessageCreatedAt: u.createdAt,
            };

            newConversations.push(user);
          });

          const sortedConversations = newConversations.sort((a, b) =>
            b.lastMessageCreatedAt.toString().localeCompare(a.lastMessageCreatedAt)
          );
    
          user.newConversations = sortedConversations;
    
          return user;
        },
      
        async getUsers(_,{userId}) {
          const userFollowing = [];
          const query = {
            $and: [{ _id: { $ne: userId } }, { _id: { $nin: userFollowing } }],
          };
          try {
            const follow = await Follow.find({ follower: userId }, { _id: 0 }).select('user');
            follow.map((f) => userFollowing.push(f.user));

            const users = await User.find(query)
            .populate('followers')
            .populate('following')
            // .populate({
            //   path: 'notifications',
            //   populate: [{ path: 'author' }, { path: 'follow' }, { path: 'like' }, { path: 'comment' }],
            // })
            .sort({ createdAt: 'desc' });
            return users;
          } catch (err) {
            throw new Error(err);
          }
        }, 
        async followingUser(_,{userId,searchQuery}, context){
          const authUser = await User.findOne({ _id:userId })
          
          if(!searchQuery){
            return [];
          }
          const userFollowing = [];
          // const query = {
          //   $or: [{ firstNameUser: new RegExp(searchQuery, 'i') }],
          //   _id: {
          //     $ne: authUser.id,
          //   },
          // };
          const query = {
            $and: [{ _id: { $ne: authUser.id } }, { _id: { $in: userFollowing } }],
          };
          try {
            const follow = await Follow.find({userFirstName:new RegExp(searchQuery, 'i') }, { _id: 0 }).select('user');
            follow.map((f) => userFollowing.push(f.user));

            const users = await User.find(query)
            .populate('followers')
            .populate('following')
            .sort({ createdAt: 'desc' });
            return users;
          } catch (err) {
            throw new Error(err);
          }
          
        },
        
        async followersUser(_,{userId,searchQuery}, context){
          const authUser = await User.findOne({ _id:userId })
          if(!searchQuery){
            return [];
          }
          const userFollowers = [];

          const query = {
            $and: [{ _id: { $ne: authUser.id } }, { _id: { $in: userFollowers } }],
          };
          console.log(query)

          try {
            const follow = await Follow.find({followerFirstName:new RegExp(searchQuery, 'i') },{ _id: 0 }).select('user');
            follow.map((f) => userFollowers.push(f.user));

            const users = await User.find(query)
            .populate('followers')
            .populate('following')
            .sort({ createdAt: 'desc' });
            return users;
          } catch (err) {
            throw new Error(err);
          }
        },
        async  getCurrentUser(_, {userId}){
          const user = await User.findOne({ _id:userId })
            .populate({
              path: 'posts',
              populate: [
                {
                  path: 'author',
                  populate: [
                    { path: 'followers' },
                    { path: 'following' },
                    {
                      path: 'notifications',
                      populate: [{ path: 'author' }, { path: 'follow' }, { path: 'like' }, { path: 'comment' }],
                    },
                  ],
                },
                { path: 'comments', populate: { path: 'author' } },
                { path: 'likes' },
              ],
              options: { sort: { createdAt: 'desc' } },
            })
            .populate('likes')
            .populate('followers')
            .populate('following')

          if (!user) {
            throw new Error("User with given params doesn't exists.");
          }

          return user;
        },
        async searchUsers(_,{searchQuery}, context){
          const authUser = checkAuth(context);
          console.log({authUser})

          if(!searchQuery){
            return [];
          }
          const users= User.find({
            $or: [{ firstName: new RegExp(searchQuery, 'i') }],
              _id: {
                $ne: authUser.id,
              },
            }).limit(50);
            return users;
        },
        },
 
    Mutation: {
       async login(_, {email, password}){
           const {errors, valid} = validateLoginInput(email, password);

           if(!valid){
            throw new UserInputError('Errors', {errors});
           }

           const user = await User.findOne({email});

           if(!user){
               errors.general = 'User not found'
               throw new UserInputError('Wrong credentials', {errors});
           }
           const match = await bcrypt.compare(password, user.password);
           if(!match){
            errors.general = "Wrong credentials"
            throw new UserInputError('Wrong credentials', {errors});
           }

           const token = generateToken(user);

           return {
            ...user._doc,
            id: user._id,
            token
          };
        },

       async register(
            _,
            {
                registerInput: { firstName,secondName, email, password, confirmPassword }
            }, 
               context, 
               info
            ){
                const  {valid, errors} = validateRegisterInput( firstName, secondName, email, password, confirmPassword);
                if (!valid){
                    throw new UserInputError('Errors', {errors});
                }
                const user = await User.findOne({email});
                if(user){
                     throw new UserInputError ('Email is taken',{
                         errors: {
                            email: 'This Email is taken'
                         }
                     })
                }
                password = await bcrypt.hash(password, 12);

                const newUser = new User({
                  email,
                  firstName,
                  secondName,
                  password,
                  createdAt: new Date().toISOString()
                });

                const res = await newUser.save();

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
              };
        },

        async createFollow(
          root,
          { input: { userId, followerId, firstNameFollower, secondNameFollower, firstNameUser, secondNameUser, coverImageUser, coverImageFollower}, context }
        )
        {
          
          const follow = await new Follow({
            user: userId,
            userCoverImage:coverImageUser,
            userFirstName:firstNameUser,
            userSecondName:secondNameUser,
            follower: followerId,
            followerFirstName:firstNameFollower,
            followerSecondName:secondNameFollower,
            followerCoverImage: coverImageFollower,
          }).save();

          await User.findOneAndUpdate(
            { _id: userId},
            { $push: { followers: follow.id } }
          );
          await User.findOneAndUpdate(
            { _id: followerId },
            { $push: { following: follow.id } }
          );
            
          return follow;
        },

        async deleteFollow(_,{input:{id}}){
          const follow = await Follow.findByIdAndRemove(id);

          await User.findOneAndUpdate(
            {_id: follow.user},
            {$pull: {followers: follow.id}}
          );
          await User.findOneAndUpdate(
            { _id: follow.follower},
            { $pull: {following: follow.id}}
          );
          return follow
        },
        uploadUserPhotos: async (root, {id, images}) =>{
          const { createReadStream } = await images;
          const stream = createReadStream();
          const uploadImage = await uploadToCloudinary(stream, 'user');
          if(!uploadImage) console.log('Something went wrong while uploading image.');
          
          let userImages, userImagesPublicId

          if (uploadImage.secure_url) {
            userImages = uploadImage.secure_url;
             userImagesPublicId = uploadImage.public_id;

          const updatedUser = await User.findOneAndUpdate({ _id: id }, {$push:{ images:[userImages], imagesPublicId:[userImagesPublicId] }})
            .populate('posts')
            .populate('likes');
      
          return updatedUser;
        }
        throw new Error('Something went wrong while uploading image to Cloudinary.');
      },
      deleteUserPhotos: async (root, {id, imagesPublicId}) =>{
        const publicId = await imagesPublicId 
        const deleteImage = await deleteFromCloudinary(publicId);
        if(!deleteImage) console.log('Something went wrong while uploading image.');
        
        let userImages, userImagesPublicId
        
        console.log(deleteImage)
        if (deleteImage.secure_url) {
          userImages = deleteImage.secure_url;
          userImagesPublicId = deleteImage.public_id;
          const updatedUser = await User.findByIdAndRemove({ _id: id }, {$pull:{ images:[userImages], imagesPublicId:imagesPublicId }})
          .populate('posts')
          .populate('likes');
          
          return updatedUser;
        }
    },

    uploadUserPhoto: async (root, { input: { id, coverImage, coverImagePublicId, isCover }}) => {

      const { createReadStream } = await coverImage;
      const stream = createReadStream();
      const uploadImage = await uploadToCloudinary(stream, 'user');
      if(!uploadImage) throw new Error('Something went wrong while uploading image.');

      if (uploadImage.secure_url) {
        const fieldsToUpdate = {};
        fieldsToUpdate.coverImage = uploadImage.secure_url;
        fieldsToUpdate.coverImagePublicId = uploadImage.public_id;

      const updatedUser = await User.findOneAndUpdate({ _id: id }, { ...fieldsToUpdate }, { new: true })
        .populate('posts')
        .populate('likes');

      return updatedUser.save();
    }
    throw new Error('Something went wrong while uploading image to Cloudinary.');
  },
  },
    Subscription:{
      isUserOnline: {
        subscribe: withFilter(
          () => pubsub.asyncIterator("IS_USER_ONLINE"),
          (payload, variables, { authUser }) => variables.authUserId === authUser.id
        ),
      },
    }
  };