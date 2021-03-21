const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const UserController = require("../controllers/users_controller");

router.get("/",UserController.users_get);

router.get("/:id",UserController.users_get_by_id);

router.get("/:id/:property((firstName|lastName|email|password|role|status))",UserController.users_get_by_id_property)

router.post("/",UserController.users_post_validator,UserController.users_post);

router.delete("/:id",UserController.users_delete);

router.patch("/:id",UserController.users_patch_validator,UserController.users_patch);



module.exports = router;