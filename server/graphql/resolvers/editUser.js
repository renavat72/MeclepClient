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
const { uploadToCloudinary } =require ('../../util/cloudinary');



module.exports = {
    Query: {},
    Mutation: {
        async changeFirstName(root,{ currentFirstName, newFirstName  }){
            const user = await User.findOneAndModify({ firstName: currentFirstName }, { $set: { firstName: newFirstName } }, { new: true });
            if (!user) {
              throw new Error('User Not Found');
            }
            return user;
          },
       
        async changeSecondName(root,{ currentSecondName, newSecondName  }){
          const user = await User.findOne({ secondName: currentSecondName }, { $set: { secondName: newSecondName } }, { new: true });
          if (!user) {
            throw new Error('User Not Found');
          }
          return user;
        }, 
    },
};
