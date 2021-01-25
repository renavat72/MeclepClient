const { AuthenticationError, UserInputError, withFilter, PubSub } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const User = require('../../models/User');
const Message = require('../../models/Message');
const mongoose = require('mongoose');
const { MESSAGE_CREATED, NEW_CONVERSATION } = require('../../Subscriptions');

const pubsub = new PubSub();

module.exports = {
  Query:{
    getMessages: async (root, { authUserId, userId }) => {
      const specificMessage = await Message.find()
        .and([
          { $or: [{ sender: authUserId }, { receiver: authUserId }] },
          { $or: [{ sender: userId }, { receiver: userId }] },
        ])
        .populate('sender')
        .populate('receiver')
        .sort({ updatedAt: 'asc' });
  
      return specificMessage;
    },
    getConversations: async (root, { authUserId }) => {
      const users = await User.findById(authUserId).populate(
        'messages',
        'id firstName secondName image isOnline'
      );
  
      const lastMessages = await Message.aggregate([
        {
          $match: {
            $or: [
              {
                receiver: mongoose.Types.ObjectId(authUserId),
              },
              {
                sender: mongoose.Types.ObjectId(authUserId),
              },
            ],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $group: {
            _id: '$messages',
            doc: {
              $first: '$$ROOT',
            },
          },
        },
        { $replaceRoot: { newRoot: '$doc' } },
      ]);
  
      const conversations = [];
      users.messages.map(u => {
        const user = {
          id: u.id,
          firstName: u.firstName,
          secondName: u.secondName,
          // image: u.image,
          isOnline: u.isOnline,
        };
  
        const sender = lastMessages.find(m => u.id === m.sender.toString());
        if (sender) {
          user.seen = sender.seen;
          user.lastMessageCreatedAt = sender.createdAt;
          user.lastMessage = sender.message;
          user.lastMessageSender = false;
        } else {
          const receiver = lastMessages.find(m => u.id === m.receiver.toString());
  
          if (receiver) {
            user.seen = receiver.seen;
            user.lastMessageCreatedAt = receiver.createdAt;
            user.lastMessage = receiver.message;
            user.lastMessageSender = true;
          }
        }
  
        conversations.push(user);
      });
      const sortedConversations = conversations.sort((a, b) =>
        b.lastMessageCreatedAt.toString().localeCompare(a.lastMessageCreatedAt)
      );
      return sortedConversations;
    }},

  Mutation: {
    async createMessage (
        root,
        { input: { message, sender, receiver } }, context
      ){
        let newMessage = await new Message({
          message,
          sender,
          receiver,
        }).save();

        newMessage = await newMessage
          .populate('sender')
          .populate('receiver')
          .execPopulate();
          pubsub.publish( 'MESSAGE_CREATED',{ messageCreated: newMessage });

        const senderUser = await User.findById(sender);

        if (!senderUser.messages.includes(receiver)) {
          await User.findOneAndUpdate(
            { _id: sender },
            { $push: { messages: receiver } }
          );
          await User.findOneAndUpdate(
            { _id: receiver },
            { $push: { messages: sender } }
          );

          newMessage.isFirstMessage = true;
        }
        pubsub.publish(NEW_CONVERSATION, {
          newConversation: {
            receiverId: receiver,
            id: senderUser.id,
            firstName: senderUser.firstName,
            secondName: senderUser.secondName,
            image: senderUser.image,
            isOnline: senderUser.isOnline,
            seen: false,
            lastMessage: newMessage.message,
            lastMessageSender: false,
            lastMessageCreatedAt: newMessage.createdAt,
          },
        });
        return newMessage;
      },
    async updateMessageSeen(root, { input: { sender, receiver } }){
        try {
          await Message.update({ receiver, sender, seen: false }, { seen: true }, { multi: true });
          return true;
        } catch (e) {
          return false;
        }
      },
    },
  Subscription:{
            messageCreated: {
                subscribe: withFilter(
                  () => pubsub.asyncIterator('MESSAGE_CREATED'),
                  (payload, variables) => {
                    const { sender, receiver } = payload.messageCreated;
                    const { authUserId, userId } = variables;
                    console.log(authUserId);
                    if (!authUserId) throw new AuthenticationError('Unauthenticated')
                    const isAuthUserSenderOrReceiver =
                      authUserId === sender.id || authUserId === receiver.id;
                    const isUserSenderOrReceiver =
                      userId === sender.id || userId === receiver.id;
                    return isAuthUserSenderOrReceiver && isUserSenderOrReceiver;
                  }
                ),
              },
              newConversation: {
                subscribe: withFilter(
                  () => pubsub.asyncIterator(NEW_CONVERSATION),
                  (payload, variables) =>{
                    const {authUser} = variables;

                    authUser && authUser.id === payload.newConversation.receiverId}
                ),
              },
          }
  }