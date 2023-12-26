const mongoose = require('mongoose');
const {Schema} = mongoose;

const Userschema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },

    role:{
        type: Number,
        default: 0
    }
    
})
 

const User = mongoose.model('User', Userschema);
User.createIndexes()
module.exports = User;