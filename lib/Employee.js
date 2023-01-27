// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email){
        //this.name is the iput and name is the output
        this.name = name;
        this.id = id;
        this.email = email;
        this.status = "Employee"
    }
    getName(){
      return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return this.status;
    }
}
module.exports = Employee;