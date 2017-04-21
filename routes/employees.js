const express = require('express');
const router = express.Router();
const data = require('../data');
const employees = data.employees;


router.get('/', (req,res) => {
    employees.getAllEmployees().then((emps) =>{
        res.send(emps);
    });
});


router.post('/', (req,res) =>{
    let reqInfo = req.body
    employees.addEmployee(
        reqInfo.firstName,
        reqInfo.lastName,
        reqInfo.title,
        reqInfo.hireDate).then((employee)=> {
            res.json(employee);
        });
});


router.get('/:id', (req,res) => {
    employees.getEmployeeById(req.params.id).then((employee) =>{
        res.json(employee);
    });
});

router.put('/:id', (req,res) => {
    let employee = req.body;
    employees.updateEmployee(req.params.id, employee).then((foo) => {
        res.json(foo);
    });
});

router.delete('/:id', (req,res) => {
    employees.removeEmployee(req.params.id).then(() => {
        res.send("deleted user");
    });
});




module.exports = router;