const express = require('express');
const router = express.Router();
const data = require('../data');
const trucks = data.trucks;



router.get('/', (req,res) => {
    trucks.getAllTrucks().then((allTrucks) =>{
        res.send(allTrucks);
    })
    .catch((err) => {
        res.send(err);
    });
});


router.post('/', (req,res) =>{
    let reqInfo = req.body
    trucks.addTruck(
        reqInfo.vin,
        reqInfo.model,
        reqInfo.brand,
        reqInfo.year).then((truck)=> {
            res.send(truck);
        })
        .catch((err) => {
            res.send(err);
        });
});


router.get('/:id', (req,res) => {
    trucks.getTruckById(req.params.id).then((truck) =>{
        res.send(truck);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.put('/:id', (req,res) => {
    let truck = req.body;
    trucks.updateTruck(req.params.id, truck).then((updatedTruck) => {
        res.send(updatedTruck);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.delete('/:id', (req,res) => {
    trucks.removeTruck(req.params.id).then(() => {
        res.send("deleted truck");
    })
    .catch((err) => {
        res.send(err);
    });
});




module.exports = router;