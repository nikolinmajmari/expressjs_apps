const mongose = require("mongoose");


const NoteSchema = new mongose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:false
    },
    timestamp:{
        type:Date,
        required:false
    }
});

const Note = mongose.model("notes_app_note",NoteSchema);
module.exports = Note;
