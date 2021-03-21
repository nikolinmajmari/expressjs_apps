const LocalStrategy = require("passport-local").Strategy;
const mongose = require("mongoose");
const bcrypt = require("bcryptjs");

// user
const User = require("../models/User");






module.exports = function (passport){
    passport.use(
        new LocalStrategy({
            usernameField:'email'
        },async (email,password,done)=>{
            // match user
           try{
               let user = await User.findOne({email:email});
               console.log("found user ",user);
               if(!user){
                   return done(null,false,{message:"that email is not registered"});
               }
               // match password
               let result = await bcrypt.compare(password,user.password);
               if(result){
                   console.log("auth success with ",user);
                   return done(null,user);
               }else{
                   return done(null,false,{"message":"password invalid"});
               }
           }catch (error){
               return done(error,false);
           }
        })
    );
    passport.serializeUser(function (user,done){
        console.log("serialize");
        done(null,user.id);
    });
    passport.deserializeUser(function (id,done){
        console.log("deserialize",id);
        User.findById(id, function(err, user) {
            console.log("deserialized "+user);
            done(err, user);
        });
    })
}









