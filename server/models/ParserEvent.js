const {model, Schema} = require('mongoose');

const parserEventSchema = new Schema ({
      title: String,
      createdAt: String,
      urlContent: String,
      code: String,
      headerDescription: String,
      description: String,
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