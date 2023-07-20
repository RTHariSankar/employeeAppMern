const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String
    },
    registeredAt:{
        type:Date,
        default: new Date()
    }
})

const registerModel = mongoose.model('loginCredentials',registerSchema);

module.exports = registerModel;