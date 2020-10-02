const {model, Schema} = require('mongoose');

const postSchema = new Schema ({
    userId:String,
    firstname: String,
    secondname: String,
    createdAt: String,
    nameOfEvent: String,
    aboutOfEvent: String,
    timeOfEvent: String,
    typeOfEvent: String,
    address: String,
    lat: String,
    lng: String,
    privateEvent: String,
    notifyFriends: String,
    adultEvent: String,
    imagesOfEvent: String,
    locationOfEvent: {
          address:String,
          lat: String,
          lng: String,
        },
    comments:[
        {
            body: String,
            firstname: String,
            secondname: String,
            createdAt: String
        }
    ],
    likes: [
        {
            userId: String,
            firstname: String,
            secondname: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema)