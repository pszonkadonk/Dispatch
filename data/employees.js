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
    },
    updateEmployee(id, updatedEmployee) {
        return employees().then((employeeCollection) => {
            let updatedEmployeeInfo = {
                firstName: updatedEmployee.firstName,
                lastName: updatedEmployee.lastName,
                title: updatedEmployee.title,
                hireDate: updatedEmployee.hireDate
            };
            return employeeCollection.updateOne({_id: id},{
                $set:updatedEmployeeInfo
            }).then(() => {
                console.log(this);
                return this.getEmployeeById(id);  
            }); 
        });
    },
    removeEmployee(id) {
        return employees().then((employeeCollection) => {
            return employeeCollection.removeOne({_id: id}).then((deletedInfo) => {
                if(deletedInfo.deletedCount === 0){
                    throw(`Could not delete user with id ${id}`);
                }
            });
        });
    }
}

module.exports = exportedMethods;