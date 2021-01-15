const {model, Schema} = require('mongoose');

const userSchema = new Schema ({
    firstName: String,
    secondName: String,
    password: String,
    email: String,
    createdAt: String,
    image: String,
    imagePublicId: String,
    coverImage: String,
    coverImagePublicId: String,
    isOnline: {
      type: Boolean,
      default: false,
    },
    followers: [
        {
          firstNameFollower: String,
          secondNameFollower: String,
          type: Schema.Types.ObjectId,
          ref: 'Follow',
        },
      ],
      following: [
        {
          firstNameUser: String,
          secondNameUser: String,
          type: Schema.Types.ObjectId,
          ref: 'Follow',
        },
      ],
      notifications: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Notification',
        },
      ],
      messages: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
});

module.exports = model('User', userSchema)