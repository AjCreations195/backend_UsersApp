const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
   name:String,
    email:String,
    age:Number,
    manager:String,
    company:String,
    gender:String,
    file:String
});

module.exports = mongoose.model('Users',UsersSchema)
