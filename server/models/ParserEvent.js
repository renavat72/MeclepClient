const {model, Schema} = require('mongoose');

const parserEventSchema = new Schema ({
      title: String,
      createdAt: String,
      urlContent: String,
      code: String,
      isOnline: Boolean,
      headerDescription: String,
      description: String,
      city: String,
      address: String,
      time: String,
      period: String,
      website: String,
      images: [String],
      lat: String,
      lng: String,
      likes: [
        {
            userId: String,
            firstName: String,
            secondName: String,
            createdAt: String
        }
    ],
});

module.exports = model('ParserEvent', parserEventSchema)