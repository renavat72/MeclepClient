const {model, Schema} = require('mongoose');

const followSchema = new Schema(
  {
    userFirstName:String,
    userSecondName:String,
    userCoverImage:String,
    followerFirstName: String,
    followerSecondName: String,
    followerCoverImage:String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model('Follow', followSchema);