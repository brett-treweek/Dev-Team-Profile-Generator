const employeeObject = require("./Employee");

class Manager extends employeeObject{
    constructor(name, id, email, role, officeNumber){
        super(name,id,email,role)
        this.officeNumber = officeNumber
    }
    
}

module.exports = Manager;

