const mongoCollections = require('../db/mongoCollections');
const stations = mongoCollections.stations;
const uuid = require('uuid');



let exportedMethods = {
    getAllStations() {
        return stations().then((stationCollection) => {
            return stationCollection.find({}).toArray();
        });
    },
    getStationById(id) {
        return stations().then((stationCollection) => {
            return stationCollection.findOne({_id: id}).then((station) => {
                if(!station) {
                    throw("could not find station");
                }
                return station;
            });
        });
    },
    addStation(customer, owner, street, city, zip, contactNumber) {
        return stations().then((stationCollection) => {
            let newStation = {
                _id: uuid.v4(),
                customer: customer,
                owner: owner,
                street: street,
                city: city,
                zip: zip,
                contactNumber: contactNumber
            };
            return stationCollection.insertOne(newStation).then((newInsert) => {
                return newInsert.insertedId;
            }).then((newId) => {
                return this.getStationById(newId);
            })
        });
    },
    updateStation(id, updatedStation) {
        return stations().then((stationCollection) => {
            let updatedStationInfo = {
                customer: updatedStation.customer,
                owner: updatedStation.owner,
                street: updatedStation.street,
                city: updatedStation.city,
                zip: updatedStation.zip,
                contactNumber: updatedStation.contactNumber
            };
            return stationCollection.updateOne({_id: id},{
                $set:updatedStationInfo
            }).then(() => {
                return this.getStationById(id);  
            }); 
        });
    },
    removeStation(id) {
        return stations().then((stationCollection) => {
            return stationCollection.removeOne({_id: id}).then((deletedInfo) => {
                if(deletedInfo.deletedCount === 0){
                    throw(`Could not delete station with id ${id}`);
                }
            });
        });
    }
}

module.exports = exportedMethods;