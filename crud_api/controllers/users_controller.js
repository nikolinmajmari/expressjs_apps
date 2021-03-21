const {body, validationResult} = require("express-validator");
const UserModel = require("../models/User");
const mongoose = require("mongoose");

// regexs
const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);

// get
const users_get = async function(req,res,next){
    try{
        let users = await UserModel.find();
        res.json(users);
    }catch (e){
        next(e);
    }
}

const users_get_by_id = async function(req,res,next){
    let id = req.params?.id;
    try{
        let user = await UserModel.findById(id);
        if(user){
            res.json(user);
        }else{
            res.send("user not found");
        }
    }catch (error){
        next(error);
    }
}

const users_get_by_id_property = async function(req,res,next){
    let id = req.params?.id;
    let property = req.params?.property;
    try{
        let user = await UserModel.findById(id);
        console.log(property,property.toString() in patchable_props, [...patchable_props,"email"]);
        if(user&& [...patchable_props,"email"].filter(e=>e==property).length>0){
            res.json(user[property]);
        }else if(user) {
            res.send("invalid property");
        }else{
            res.send("user not found");
        }
    }catch (error){
        next(error);
    }
}


// post
const user_validator = [
    body(["firstName", "lastName"]).custom((value) => {
        return value !== null && value?.length > 3;
    }),
    body("email").custom(async (email) => {
        if (await UserModel.findOne({email: email})) {
            return emailRegex.test(email);
        }
    }),
    body("password").custom((password) => {
        return passwordRegex.test(password);
    }),
    body("retypePassword").custom((password, {req}) => {
        return password === req.body?.password;
    }),
]

const users_post_validator = [ ...user_validator,
    (req,res,next)=>{
        let errors = validationResult(req).errors;
        if (errors?.length > 0) {
            res.send(errors);
        }else{
            next();
        }
    }
];

const users_post = async function (req, res, next) {
    try {
        const {firstName,lastName,email,password} = req.body;
        if (!await UserModel.findOne({email: email})) {
            let user = new UserModel({role: "ROLE_USER", status: 1,firstName,lastName,email,password});
            await user.save();
            res.send(user.id);
        } else {
            res.send("User already exists");
        }
    } catch (e) {
        next(e);
    }
}

// delete

const users_delete = async (req,res,next)=>{
    let id = req.params?.id;
    try{
        let a;
        if(a =  await UserModel.findByIdAndDelete(id)){
            res.send("removed user with "+a.id);
        }
        else{
           res.send("element is already removed");
        }
    }catch (e){
        next(e);
    }
}

// patch

const patchable_props = ["firstName","lastName","password","retypePassword","status"]

const users_patch_validator = [...user_validator,
    (req,res,next)=>{
        let errors = validationResult(req).errors.filter(e=>e.param in patchable_props&& e.value===undefined);
        if(errors.length>0){
            res.json(errors);
        }else{
            req.body.email = undefined;
            req.body.retypePassword = undefined;
            next();
        }
    }
]

const users_patch = async (req,res,next)=>{
    let id = req.params?.id;
    let update = extractUpdateFields(req);
    try{
        let result = await UserModel.findByIdAndUpdate(id,update,{useFindAndModify:false});
        res.send("the collection was updated successfully");
    }catch (e){
        console.log(e);
        res.send(e);
    }
}

function extractUpdateFields(req){
    let update = {};
    for(let key in req.body){
        if(req.body[key]!=undefined){
            update[key] = req.body[key]
        }
    }
    return update;
}

module.exports = {
    users_post_validator, users_post,
    users_get,users_get_by_id, users_get_by_id_property,
    users_delete,
    users_patch_validator,users_patch,
}