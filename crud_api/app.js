const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// import routes and config
const usersRoute = require("./routes/users");

const dbUri = require("./config/keys").MongoUri;
const app = express();
mongoose.connect(dbUri,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true,
}).then(function (e){
    console.log(e);
}).catch(function (e){
    console.log("error"+e);
});

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

// routes
app.use("/users",usersRoute);


app.use((req,res)=>{
    res.send("error 404");
})
// init
const PORT = 3000;
app.listen(PORT,()=>console.log("server running on http://localhost:"+PORT));
