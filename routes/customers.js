const express = require('express');
const router = express.Router();
const data = require('../data');
const customers = data.customers;


router.get('/', (req,res) => {
    customers.getAllCustomers().then((allCustomers) =>{
        res.send(allCustomers);
    })
    .catch((err) => {
        res.send(err);
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
            res.send(customer);
        })
        .catch((err) => {
            console.log(err);
        });
});


router.get('/:id', (req,res) => {
    customers.getCustomerById(req.params.id).then((customer) =>{
        res.send(customer);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.put('/:id', (req,res) => {
    let customer = req.body;
    customers.updateCustomer(req.params.id, customer).then((updatedCustomer) => {
        res.send(updatedCustomer);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.delete('/:id', (req,res) => {
    customers.removeCustomer(req.params.id).then(() => {
        res.send("deleted customer");
    })
    .catch((err) => {
        res.send(err);
    });
});




module.exports = router;