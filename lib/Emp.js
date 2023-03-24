class Employee {
    
  constructor(name, lastname, id, email) {
    this.name = name;
    this.lastname = lastname;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getLastName() {
    return this.lastname;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }

}

module.exports = Employee;
