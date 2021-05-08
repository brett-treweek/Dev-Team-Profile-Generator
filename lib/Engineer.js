const employeeObject = require("./Employee");

class Engineer extends employeeObject{
    constructor(name, id, email, role, gitHub){
        super(name,id,email,role)
        this.gitHub = gitHub
    }
    getGitHub(){
        return this.gitHub;
    }
    
}




  module.exports = Engineer;