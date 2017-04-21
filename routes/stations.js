const express = require('express');
const router = express.Router();
const data = require('../data');
const stations = data.stations;



router.get('/', (req,res) => {
    stations.getAllStations().then((stat) =>{
        res.send(stat);
    });
});


router.post('/', (req,res) =>{
    let reqInfo = req.body
    stations.addStation(
        reqInfo.customer,
        reqInfo.owner,
        reqInfo.street,
        reqInfo.city,
        reqInfo.zip,
        reqInfo.contactNumber).then((station)=> {
            res.json(station);
        });
});


router.get('/:id', (req,res) => {
    stations.getStationById(req.params.id).then((station) =>{
        res.json(station);
    });
});

router.put('/:id', (req,res) => {
    let station = req.body;
    stations.updateStation(req.params.id, station).then((foo) => {
        res.json(foo);
    });
});

router.delete('/:id', (req,res) => {
    stations.removeStation(req.params.id).then(() => {
        res.send("deleted station");
    });
});




module.exports = router;