module.exports = {
    ensureAuthenticated : function (req,res,next){
        console.log("ensure authenticated",req.isAuthenticated());
        if(req.isAuthenticated()){
            return next();
        }req.flash("error_msg","please log in");
        return res.redirect("/users/login");
    }
}