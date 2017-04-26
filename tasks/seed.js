const customers = require("../data/customers");
const employees = require("../data/employees");
const stations = require("../data/stations");
const trucks = require("../data/trucks");

employees.addEmployee({
    "firstName": "Michael",
    "lastName": "Pszonka",
    "title": "Software Engineer Intern",
    "hireDate": "5/15/2017"
    }).then(() => {
        employees.addEmployee({
            "firstName": "Richard",
            "lastName": "Pszonka",
            "title": "Nurse",
            "hireDate": "5/15/2017"
            });
        });
