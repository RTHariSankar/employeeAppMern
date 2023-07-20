const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    designation:{
        type:String,
        required:[true, 'designation is required']
    },
    department:{
        type:String,
        required:[true, 'department is required']
    },
    salary:{
        type:String,
        required:[true, 'salary is required']
    },
    email:{
        type:String,
        required:[true, 'email is required']
    },
    phone:{
        type:String,
        required:[true, 'phone is required']
    },
    ecName:{
        type:String,
        required:[true, 'ecName is required']
    },
    ecRelationship:{
        type:String,
        required:[true, 'ecRelationship is required']
    },
    ecTelephone:{
        type:String,
        required:[true, 'ecTelephone is required']
    },
    ecMobile:{
        type:String,
        required:[true, 'ecMobile is required']
    },
    addedAt:{
        type:Date,
        default: new Date()
    }
})

const employeeModel = mongoose.model('employeeCredentials',employeeSchema);

module.exports = employeeModel;