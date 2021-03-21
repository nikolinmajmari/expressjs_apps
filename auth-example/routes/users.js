var express = require('express');
var router = express.Router();
const RegisterForm = require("../forms/register_form");
var bcrypt = require('bcryptjs');
const passport = require("passport");

/* GET users listing. */

const User = require("../models/User");
const usersController = require("../controllers/users_controller");

router.get('/',(res)=>res.send("hey"));

router.get("/login",usersController.user_login_get);

router.get("/register",usersController.user_register_get);

router.post("/register",usersController.user_register_post);

router.post("/login",passport.authenticate("local",{
  successRedirect: '/dashboard',
    failureRedirect: '/users/login' }));

router.get("/logout",usersController.user_logout_get);

module.exports = router;
