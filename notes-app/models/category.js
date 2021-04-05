const mongose = require("mongoose");

const CategorySchema = mongose.Schema({
    name:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        required:false
    },
    timestamp:{
        type:Date,
        required: false,
    },
    user:{
        type:String,
        required:false,
    }
});

const Category = mongose.model("notes_app_category",CategorySchema);
module.exports=Category;