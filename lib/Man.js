const Employee = require("./Emp");

class Manager extends Employee {

  constructor(name, lastname, id, email, officeNumber) {
    super(name, lastname, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    return "Manager";
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

}

module.exports = Manager;
