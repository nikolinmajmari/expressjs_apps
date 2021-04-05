/**
 *
 * @param req Request
 * @param res Response
 * @param next Function
 * @returns {Promise<void>}
 */
const Note = require("../models/note");

const notes_get = async function (req, res, next) {
    const notes = await Note.find();
    res.render('notes/index', {notes: notes});
};

const notes_new_get = (req, res, next) => res.render("notes/add");

const notes_new_post = async (req, res, next) => {
    try {
        const {title, content} = req.body;
        if (title && content) {
            const note = new Note({title, content});
            await note.save();
            return res.redirect("/notes");
        }
        return res.json("error occoured");
    } catch (e) {
        return res.json(e);
    }
    return res.json("hey");
}

const notes_id_post = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, content} = req.body;
        await Note.findByIdAndUpdate(id, {title, content});
        const note = await Note.findById(id);
        return res.render("notes/add", {note: note});
    } catch (error) {
        return res.send(error);
    }
    return res.send("editing note at " + req.params.id);
}

const notes_id_get = async (req, res, next) => {
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        if (note == null) {
            return next("Not Found Exception");
        }
        console.log(note);
        return res.render("notes/add", {note: note});
    } catch (error) {
        return res.send(error);
    }
    return res.send("editing note at " + req.params.id);
}

const notes_id_delete = async (req, res, next) => {
    let msg, status = true;
    try {
        const {id} = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (note) {
            msg = "deleted note " + id;
        } else {
            msg = "not exists";
            status = false;
        }
    } catch (e) {
        status = false;
        msg = e;
    }
    res.json({status, msg});
}

module.exports = {
    notes_get,notes_new_get,notes_new_post,notes_id_get,notes_id_post,notes_id_delete
};

