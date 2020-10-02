const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const User = require('../../models/User');
const Message = require('../../models/Message');
const mongoose = require('mongoose');


module.exports = {
  Query:{
    getMessages: async(parent,{from}, {user})=>{
        try{
            if(!user) throw new AuthenticationError("Unauthenticated")

            const otherUser= await User.findOne({
                where:{user: from}
            })
            if(!otherUser) throw new UserInputError("User not found")
            const user = checkAuth(context);
            const usernames = [user.firstname, otherUser.firstname]
        
            const messages = await Message.findAll({
               
                  from: { usernames },
                           
                 order: [['createdAt', 'DESC']],
              })
      
          return messages
        }

        catch(err){
            console.log(err)
            throw err
        }
    }
  },
  Mutation: {
      sendMessage: async (parent, {to, content}, context) => {
          try{
            const user = checkAuth(context);
            if(!user) throw new AuthenticationError("Unauthenticated")
            const recipient = await User.findOne()

            if(!recipient){
                throw new UserInputError('User not found')
            } else if(recipient.firstname === user.firstname){
                throw new UserInputError('You cant message yours')
            }
            if(content.trim() === ''){0
                throw new UserInputError('Message is empty')
            }

            const message = await Message.create({
                from: user.firstname,
                to,
                content
            })

            return message
          }
          catch(err){
            console.log(err)
            throw err
          }
      }
  }
}