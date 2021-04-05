var express = require('express');
var router = express.Router();

const Note = require("../models/note");


/* GET home page. */
router.get('/', async function(req, res, next) {
    const notes = await Note.find();
    res.render('notes/index', { notes:notes });
});


router.get("/new",function (req,res,next){
    res.render("notes/add");
});

router.post("/new",async function (req,res,next){
    try{
        const {title , content} = req.body;
        if(title&&content){
            const note = new Note({title,content});
            await note.save();
            return res.redirect("/notes");
        }
        return res.json("error occoured");
    }catch (e){
        return res.json(e);
    }
    return res.json("hey");
})

router.post("/:id",async function (req,res,next){
    try{
        const {id} = req.params;
        const {title,content} = req.body;
        await Note.findByIdAndUpdate(id,{title,content});
        const note = await Note.findById(id);
        return res.render("notes/add",{ note:note });
    }catch (error){
        return res.send(error);
    }
    return res.send("editing note at "+req.params.id);
});

router.get("/:id",async function (req,res,next){
    try{
        const {id} = req.params;
        const note = await Note.findById(id);
        if(note==null){
            return next("Not Found Exception");
        }
        console.log(note);
        return res.render("notes/add",{ note:note });
    }catch (error){
        return res.send(error);
    }
    return res.send("editing note at "+req.params.id);
})

router.patch("/:id",function (req,res,next){
    res.send("patching note at id "+req.params.id);
})

router.delete("/:id",async function (req,res,next){
    let msg,status=true;
    try{
        const {id} = req.params;
        const note = await Note.findByIdAndDelete(id);
        if(note){
            msg = "deleted note "+id;
        }else{
            msg="not exists";
            status = false;
        }
    }catch (e){
        status = false;
        msg=e;
    }
    res.json({status,msg});
})

module.exports = router;
