var express = require('express');
var router = express.Router();

const Note = require("../models/note");

const NotesController = require("../controllers/notes_controller");

/* GET home page. */
router.get('/', NotesController.notes_get);

router.get("/new",NotesController.notes_new_get);

router.post("/new",NotesController.notes_new_post);

router.post("/:id",NotesController.notes_id_post);

router.get("/:id",NotesController.notes_id_get)

router.delete("/:id",NotesController.notes_id_delete);

module.exports = router;
