// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email, school);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return Intern.name;
    }
}

module.exports = Intern;

// In addition to `Employee`'s properties and methods, `Intern` will also have:
//   * school 
//   * getSchool()
//   * getRole() // Overridden to return 'Intern'