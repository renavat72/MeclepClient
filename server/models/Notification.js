const {model, Schema} = require('mongoose');

const notificationSchema = new Schema ({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      post: Schema.Types.ObjectId,
      follow: {
        type: Schema.Types.ObjectId,
        ref: 'Follow',
      },
      seen: {
        type: Boolean,
        default: false,
      },
})

module.exports = model('Notification', notificationSchema)