const express = require('express');
const router = express.Router();
const data = require('../data');
const employees = data.employees;


router.get('/', (req,res) => {
    employees.getAllEmployees().then((allEmployees) =>{
       res.send(allEmployees);
    });
    // .catch((err) => {
    //     res.send(err);
    // });
});


router.post('/', (req,res) =>{
    let reqInfo = req.body
    employees.addEmployee(
        reqInfo.firstName,
        reqInfo.lastName,
        reqInfo.title,
        reqInfo.hireDate).then((employee)=> {
            return employee;
        })
        .catch((err) => {
            res.send(err);
        });
});


router.get('/:id', (req,res) => {
    employees.getEmployeeById(req.params.id).then((employee) =>{
        res.send(employee);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.put('/:id', (req,res) => {
    let employee = req.body;
    employees.updateEmployee(req.params.id, employee).then((updatedEmployee) => {
        res.send(updatedEmployee);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.delete('/:id', (req,res) => {
    employees.removeEmployee(req.params.id).then(() => {
        res.send("deleted user");
    })
    .catch((err) => {
        res.send(err);
    });
});




module.exports = router;