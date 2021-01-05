const {model, Schema} = require('mongoose');

const postSchema = new Schema ({
    userId:String,
    firstName: String,
    secondName: String,
    createdAt: String,
    nameOfEvent: String,
    aboutOfEvent: String,
    timeOfEvent: String,
    typeOfEvent: String,
    address: String,
    lat: String,
    lng: String,
    privateEvent: Boolean,
    notifyFriends: Boolean,
    adultEvent: Boolean,
    image: String,
    imagePublicId: String,
    locationOfEvent: {
          address:String,
          lat: String,
          lng: String,
        },
    comments:[
        {
            body: String,
            firstName: String,
            secondName: String,
            createdAt: String
        }
    ],
    likes: [
        {
            userId: String,
            firstName: String,
            secondName: String,
            createdAt: String
        }
    ],
    expire_at: {type: Date, default: Date.now, expires: 3600*1460},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema)