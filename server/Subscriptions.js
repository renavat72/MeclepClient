const { PubSub} = require('apollo-server-express');

const NEW_POST = 'NEW_POST';

const NEW_PARSER_EVENT = 'NEW_PARSER_EVENT';


const MESSAGE_CREATED = 'MESSAGE_CREATED';

const IS_USER_ONLINE = 'IS_USER_ONLINE';

const NEW_CONVERSATION = 'NEW_CONVERSATION';

const NOTIFICATION_CREATED_OR_DELETED =
  'NOTIFICATION_CREATED_OR_DELETED';
  
  module.exports={
    MESSAGE_CREATED,
    IS_USER_ONLINE,
    NEW_CONVERSATION,
    NOTIFICATION_CREATED_OR_DELETED,
    NEW_POST,
    NEW_PARSER_EVENT
  }
  const pubSub = new PubSub();
  module.exports={pubSub}