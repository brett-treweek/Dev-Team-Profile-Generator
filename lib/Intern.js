const employeeObject = require("./Employee");

class Intern extends employeeObject{
    constructor(name, id, email, role, school){
        super(name,id,email,role)
        this.school = school
    }
    getSchool(){
        return this.school;
    }
    
}

  module.exports = Intern;