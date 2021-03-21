const Form = require("./form");

class RegisterForm extends Form{
    constructor() {
        super();
        this.fields = {
            name:null,
            surname:null,
            password:null,
            retypePassword:null,
            email:null,
        };
        this.name= "registerForm";
        this.errors = [];
    }
    eval(){
        let name = this.evalName();
        let surname = this.evalSurname();
        let email = this.evalEmail();
        let password = this.evalPassword();
        console.log(name,surname,email,password);
        this.status= name&surname&email&password;
    }

    // validate fields
    evalName(){
        if(this.fields.name===null||this.fields.name?.length == 0){
            this.errors.push({msg:"name can not be null"});
            this.fields.name = null;
            return false;
        }
        return true;
    }
    evalSurname(){
        if(this.fields.surname===null||this.fields.surname?.length===0){
            this.errors.push({msg:"surname can not be null"});
            this.fields.surname = null;
            return false;
        }
        return true;
    }
    evalPassword(){
        let regex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);
        if(this.fields.retypePassword!==this.fields.password){
            this.errors.push({msg:"Passwords do not match"});
            this.fields.retypePassword = null;
            return false;
        }
        if(!regex.test(this.fields.password)){
            this.errors.push({msg:"Password must contain the specified specifications"});
            this.fields.password = null;
            this.fields.retypePassword = null;
            return false;
        }
        return true;
    }
    evalEmail(){
        let regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        if(!regex.test(this.fields.email)){
            this.errors.push({msg:"please enter an valid email"});
            return false;
        }
        return true;
    }
}
function arraysMatch(a,b){
    if(a.length==b.length){
        for(let x of a){
            if(x!==undefined)
                if(b.indexOf(x)<0)
                    return false;
        }
        return true;
    }
    return false;
}


module.exports = RegisterForm;