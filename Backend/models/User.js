const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    bio : {
        type : String,
        default : 'Enter you bio here...'
    },
    userPoints : {
        type : Number
    },
    userFaceBook : {
        type : String
    },
    userLinkdin : {
        type : String
    }
})

const User = mongoose.model('users', userSchema);
module.exports = User;