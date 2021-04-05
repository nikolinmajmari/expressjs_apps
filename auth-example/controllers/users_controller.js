const RegisterForm = require("../forms/register_form");
var bcrypt = require('bcryptjs');
const passport = require("passport");
const User = require("../../crud_api/models/User");


module.exports.user_login_get = (req,res,next)=> res.render("login");

module.exports.user_register_get = (req,res,next)=> res.render("register",{name:null,surname:null,email:null});

module.exports.user_logout_get = (req,res,next)=>{
    req.flash("sucess_msg","you are logged out");
    req.logout();
    res.redirect("/users/login");
}

module.exports.user_register_post = async (req,res,next)=>{
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
}
