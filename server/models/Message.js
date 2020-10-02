const {model, Schema} = require('mongoose');

const messageSchema = new Schema ({
    content: String,
    uuid: String,
    id: String,
    from: String,
    to: String,
    createdAt: String,
    updatedAt: String
});

module.exports = model('Message', messageSchema)