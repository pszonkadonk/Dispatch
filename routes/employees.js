const express = require('express');
const router = express.Router();
const data = require('../data');
const employees = data.employees;


// let employees = [
//         {
//             id: "123",
//             name: "Michael",
//             title: "Software Engineer",
//             hireDate: "5/15/2017"
//         },
        // {
        //     id: "456",
        //     name: "Richard",
        //     title: "Nurse",
        //     hireDate: "1/15/2016"
        // }
//     ]

router.get('/', (req,res) => {
    employees.getAllEmployees().then((emps) =>{
        res.send(emps);
    })
})

router.get('/:id', (req,res) => {
    employees.getEmployeeById(req.params.id).then((employee) =>{
        res.json(employee);
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


module.exports = router;