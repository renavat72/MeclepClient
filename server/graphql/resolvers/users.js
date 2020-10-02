const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError, AuthenticationError} = require('apollo-server')
const checkAuth = require('../../util/check-auth');

const {validateRegisterInput, validateLoginInput} = require ('../../util/validators')
const {SECRET_KEY} = require('../../../config')
const User = require('../../models/User');

function generateToken(user){
  return jwt.sign({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      secondname: user.secondname
  }, SECRET_KEY,
  {expiresIn: '1h'});
}

module.exports = {
    Query: {
        async getUsers() {
          try {
            const users = await User.find().sort({ createdAt: -1 });
            return users;
          } catch (err) {
            throw new Error(err);
          }
        },
        getCurrentUser: async (root, args, { currentUser, User }) => {
          if (!currentUser) {
            return null;
          }
          const user = await User.findOne({ email: currentUser.email });
          return user;
        },
    
        getUserProfile: async (root, args, { currentUser, User }) => {
          if (!currentUser) {
            return null
          }
          const user = await User.findOne({ email: currentUser.email })
          return user;
        },
    
        profilePage: async (root, { usenrame }, { User }) => {
          const profile = await User.findOne({ username });
          return profile;
        }
    
      },
    
    Mutation: {
       async login(_, {email, password}){
           const {errors, valid} = validateLoginInput(email, password);

           if(!valid){
            throw new UserInputError('Errors', {errors});
           }

           const user = await User.findOne({email});

           if(!user){
               errors.general = 'User not found'
               throw new UserInputError('Wrong credentials', {errors});
           }
           const match = await bcrypt.compare(password, user.password);
           if(!match){
            errors.general = "Wrong credentials"
            throw new UserInputError('Wrong credentials', {errors});
           }

           const token = generateToken(user);

           return {
            ...user._doc,
            id: user._id,
            token
          };
        },

       async register(
            _,
            {
                registerInput: { firstname,secondname, email, password, confirmPassword }
            }, 
               context, 
               info
            ){
                const  {valid, errors} = validateRegisterInput( firstname, secondname, email, password, confirmPassword);
                if (!valid){
                    throw new UserInputError('Errors', {errors});
                }
                const user = await User.findOne({email});
                if(user){
                     throw new UserInputError ('Email is taken',{
                         errors: {
                            email: 'This Email is taken'
                         }
                     })
                }

                password = await bcrypt.hash(password, 12);

                const newUser = new User({
                  email,
                  firstname,
                  secondname,
                  password,
                  createdAt: new Date().toISOString()
                });
          
                const res = await newUser.save();

            const token = generateToken(res)
            
            return {
                ...res._doc,
                id: res._id,
                token
              };
        },
      async changeFirstname(root,{ currentFirstname, newFirstname  }){

        const user = await User.findOneAndModify({ firstname: currentFirstname }, { $set: { firstname: newFirstname } }, { new: true });
  
        if (!user) {
          throw new Error('User Not Found');
        }
  
        return user;
  
      },
      async changeSecondname(root,{ currentSecondname, newSecondname  }){

        const user = await User.findOneAndModify({ secondname: currentSecondname }, { $set: { secondname: newSecondname } }, { new: true });
  
        if (!user) {
          throw new Error('User Not Found');
        }
  
        return user;
  
      },
    }
};