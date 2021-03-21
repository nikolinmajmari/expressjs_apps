const mongose = require("mongoose")

const UserSchema = new mongose.Schema({
    name: {
      type:String,
      required:true,
    },
    surname: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:false,
    }
});

const User = mongose.model('User',UserSchema);
module.exports = User;