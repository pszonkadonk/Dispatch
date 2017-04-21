const express = require('express');
const router = express.Router();
const data = require('../data');
const trucks = data.trucks;



router.get('/', (req,res) => {
    trucks.getAllTrucks().then((trk) =>{
        res.send(trk);
    });
});


router.post('/', (req,res) =>{
    let reqInfo = req.body
    trucks.addTruck(
        reqInfo.vin,
        reqInfo.model,
        reqInfo.brand,
        reqInfo.year).then((truck)=> {
            res.json(truck);
        });
});


router.get('/:id', (req,res) => {
    trucks.getTruckById(req.params.id).then((truck) =>{
        res.json(truck);
    });
});

router.put('/:id', (req,res) => {
    let truck = req.body;
    trucks.updateTruck(req.params.id, truck).then((foo) => {
        res.json(foo);
    });
});

router.delete('/:id', (req,res) => {
    trucks.removeTruck(req.params.id).then(() => {
        res.send("deleted truck");
    });
});




module.exports = router;