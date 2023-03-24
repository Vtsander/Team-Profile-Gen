const Employee = require("./Emp");

class Intern extends Employee {
  constructor(name, lastname, id, email, school) {
    super(name, lastname, id, email);
    this.school = school;
  }

  getRole() {
    return "Intern";
  }

  getSchool() {
    return this.school;
  }
    
}

module.exports = Intern;
