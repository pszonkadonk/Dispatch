const express = require('express');
const router = express.Router();
const data = require('../data');
const customers = data.customers;


router.get('/', (req,res) => {
    customers.getAllCustomers().then((customs) =>{
        res.send(custom);
    });
});


router.post('/', (req,res) =>{
    let reqInfo = req.body
    customers.addCustomer(
        reqInfo.name,
        reqInfo.address,
        reqInfo.city,
        reqInfo.zip,
        reqInfo.contactNumber,
        reqInfo.contactEmail,
        reqInfo.stationList).then((customer)=> {
            res.json(customer);
        });
});


router.get('/:id', (req,res) => {
    customers.getCustomerById(req.params.id).then((customer) =>{
        res.json(customer);
    });
});

router.put('/:id', (req,res) => {
    let customer = req.body;
    customers.updateCustomer(req.params.id, customer).then((foo) => {
        res.json(foo);
    });
});

router.delete('/:id', (req,res) => {
    customers.removeCustomer(req.params.id).then(() => {
        res.send("deleted customer");
    });
});




module.exports = router;