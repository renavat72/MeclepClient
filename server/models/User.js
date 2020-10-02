const {model, Schema} = require('mongoose');

const userSchema = new Schema ({
    firstname: String,
    secondname: String,
    password: String,
    email: String,
    createdAt: String,
    profileImage: String

});

module.exports = model('User', userSchema)