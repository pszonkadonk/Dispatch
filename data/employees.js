const mongoCollections = require('../db/mongoCollections');
const employees = mongoCollections.employees;
const uuid = require('uuid');



let exportedMethods = {
    getAllEmployees() {
        return employees().then((employeeCollection) => {
            return employeeCollection.find({}).toArray();
        });
    },
    getEmployeeById(id) {
        return employees().then((employeeCollection) => {
            return employeeCollection.findOne({_id: id}).then((employee) => {
                if(!employee) {
                    throw("could not find employee");
                }
                return employee;
            });
        });
    },
    addEmployee(firstName, lastName, title, hireDate) {
        return employees().then((employeeCollection) => {
            let newEmployee = {
                _id: uuid.v4(),
                firstName: firstName,
                lastName: lastName,
                title: title,
                hireDate: hireDate
            };
            return employeeCollection.insertOne(newEmployee).then((newInsert) => {
                return newInsert.insertedId;
            }).then((newId) => {
                return this.getEmployeeById(newId);
            })
        });

    }
}

module.exports = exportedMethods;