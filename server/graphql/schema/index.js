const { mergeTypes }  = require( "merge-graphql-schemas");

const postSchema = require('./postSchema');
const userSchema = require('./userSchema');
const notificationSchema = require('./notificationSchema');
const messageSchema = require('./messageSchema');

const typeDefs = [messageSchema, postSchema, userSchema,notificationSchema]

module.exports = mergeTypes(typeDefs,{all:true});