var express = require('express');
var router = express.Router();
const RegisterForm = require("../forms/register_form");
var bcrypt = require('bcryptjs');
const passport = require("passport");

/* GET users listing. */

const User = require("../models/User");


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get("/login",function (req,res,next){
  res.render("login");
});

router.get("/register",function (req,res,next){
  res.render("register",{
    name:null,surname:null,email:null
  })
})


router.post("/register",async function (req,res,next){
  let submittedData = req.body;
  let form = new RegisterForm();
  form.handleData(submittedData);
  if(form.getValidationStatus()){
    const {name,surname,email,password} = form.getFields();
    console.log(email);
    try{
      if(await User.findOne({email:email})!==null){
        throw "User Already Exists";
      }else{
        let user = new User({email,surname,name,password: await bcrypt.hash(password,10),});
        user.save();
        req.flash("sucess-msg","you were registered successfully");
        res.redirect("/users/login");
        return;
      }
    }catch (error){
      console.log("error",error);
      form.addError({"msg":error})
    }
  }
  res.render("register",{
    errors:form.getErrors(),
    ...form.getFields()
  });
});


router.post("/login",passport.authenticate("local",{
  successRedirect: '/dashboard',
    failureRedirect: '/login' }));
// logout handle

router.get("/logout",(req,res,next)=>{
  req.flash("sucess_msg","you are logged out");
  req.logout();
  res.redirect("/users/login");
})

module.exports = router;
