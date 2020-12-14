const { AuthenticationError, UserInputError, PubSub } = require('apollo-server');
const { uploadToCloudinary, deleteFromCloudinary } = require ('../../util/cloudinary');
const { NEW_POST } = require('../../Subscriptions');

const Notification = require('../../models/Notification');
const User = require('../../models/User');

const checkAuth = require('../../util/check-auth');

const pubsub = new PubSub();

module.exports = {
  Query: {
    getUserNotifications: async (root, { userId, skip, limit }, { Notification }) => {
      const query = { user: userId };
      const count = await Notification.where(query).countDocuments();
      const notifications = await Notification.where(query)
        .populate('author')
        .populate('user')
        .populate('follow')
        .populate({ path: 'comment', populate: { path: 'post' } })
        .populate({ path: 'like', populate: { path: 'post' } })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 'desc' });
  
      return { notifications, count };
    },
  },
  Mutation: {
    createNotification: async (
      root,
      { input: { userId, authorId, postId, notificationType, notificationTypeId } },
    ) => {
      let newNotification = await new Notification({
        author: authorId,
        user: userId,
        post: postId,
        [notificationType.toLowerCase()]: notificationTypeId,
      }).save();
  
      // Push notification to user collection
      await User.findOneAndUpdate({ _id: userId }, { $push: { notifications: newNotification.id } });
  
      // Publish notification created event
      newNotification = await newNotification
        .populate('author')
        .populate('follow')
        .populate({ path: 'comment', populate: { path: 'post' } })
        .populate({ path: 'like', populate: { path: 'post' } })
        .execPopulate();
        pubsub.publish("NOTIFICATION_CREATED_OR_DELETED", {
        notificationCreatedOrDeleted: {
          operation: 'CREATE',
          notification: newNotification,
        },
      });
  
      return newNotification;
    },
    },

  Subscription:{
   
  }
};