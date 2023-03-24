const Employee = require("./Emp");

class Engineer extends Employee {
  constructor(name, lastname, id, email, github) {
    super(name, lastname, id, email);
    this.github = github;
  }

  getRole() {
    return "Engineer";
  }

  getGithub() {
    return this.github;
  }
    
}

module.exports = Engineer;
