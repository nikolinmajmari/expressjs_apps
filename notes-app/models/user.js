
const mongose = require("mongoose");

const UserSchema = mongose.Schema({
   email:{
       type:String,
       required:true
   } ,
    password:{
       type:String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname:{
       type:String,
        required:true
    }
});

const User = mongose.model("notes_app_user",UserSchema);
module.exports = User;