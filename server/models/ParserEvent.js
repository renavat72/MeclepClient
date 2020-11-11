const {model, Schema} = require('mongoose');

const parserEventSchema = new Schema ({
    createdAt: String,
    title: String,
    headerDescription: String,
    urlContent:String,
    description: String,
    time: String,
    period: String,
    typeOfEvent: String,
    address: String,
    image: String,
    imagePublicId: String,
});

module.exports = model('ParserEvent', parserEventSchema)