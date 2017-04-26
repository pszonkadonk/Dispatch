const express = require('express');
const router = express.Router();
const data = require('../data');
const stations = data.stations;



router.get('/', (req,res) => {
    stations.getAllStations().then((allStations) =>{
        res.send(allStations);
    })
    .catch((err) => {
        res.send(err);
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
            res.send(station);
        })
        .catch((err) => {
            res.send(err);
        });
});


router.get('/:id', (req,res) => {
    stations.getStationById(req.params.id).then((station) =>{
        res.send(station);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.put('/:id', (req,res) => {
    let station = req.body;
    stations.updateStation(req.params.id, station).then((updatedStation) => {
        res.send(updatedStation);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.delete('/:id', (req,res) => {
    stations.removeStation(req.params.id).then(() => {
        res.send("deleted station");
    })
    .catch((err) => {
        res.send(err);
    });
});




module.exports = router;