class Form{
    constructor() {
        this.fields = {};
        this.status = false;
        this.errors = [];
        this.name= "form";
    }
    matchProperties(payload){
        let props = Object.getOwnPropertyNames(payload);
        let formProps = Object.getOwnPropertyNames(this.fields);
        return arraysMatch(props,formProps);
    }
    fillForm(data){
        for(let key in data){
            if(key!==undefined){
                this.fields[key] = data[key];
            }
        }
    }
    eval(){}
    handleData(data){
        if(this.matchProperties(data)){
            this.fillForm(data);
            this.eval();
        }else{
            this.errors.form="form had extra fields";
            this.status = false;
        }
    }
    getFields(){return this.fields;}
    getErrors(){return this.errors;}
    getValidationStatus(){return this.status;}
    addError(error){
        console.log(this.errors);
        this.errors.push(error);
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

module.exports = Form;