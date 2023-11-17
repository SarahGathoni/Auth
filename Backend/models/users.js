const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    pwd:{type:String, required:true},
    matchPwd:{type:String, required:true}   
},
{timestamps:true}
)

module.exports = mongoose.model('Usermodel', UserSchema);