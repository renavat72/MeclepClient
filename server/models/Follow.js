const {model, Schema} = require('mongoose');

const followSchema = new Schema(
  {
    coverImageUser:String,
    coverImageFollower:String,
    userFirstName:String,
    userSecondName:String,
    followerFirstName: String,
    followerSecondName: String,
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