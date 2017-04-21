const mongoCollections = require('../db/mongoCollections');
const trucks = mongoCollections.trucks;
const uuid = require('uuid');



let exportedMethods = {
    getAllTrucks() {
        return trucks().then((truckCollection) => {
            return truckCollection.find({}).toArray();
        });
    },
    getTruckById(id) {
        return trucks().then((truckCollection) => {
            return truckCollection.findOne({_id: id}).then((truck) => {
                if(!truck) {
                    throw("could not find truck");
                }
                return truck;
            });
        });
    },
    addTruck(vin, model, brand, year) {
        return trucks().then((truckCollection) => {
            let newTruck = {
                _id: uuid.v4(),
                vin: vin,
                model: model,
                brand: brand,
                year: year
            };
            return truckCollection.insertOne(newTruck).then((newInsert) => {
                return newInsert.insertedId;
            }).then((newId) => {
                return this.getTruckById(newId);
            })
        });
    },
    updateTruck(id, updatedTruck) {
        return trucks().then((truckCollection) => {
            let updatedTruckInfo = {
                vin: updatedTruck.vin,
                model: updatedTruck.model,
                brand: updatedTruck.brand,
                year: updatedTruck.year
            };
            return truckCollection.updateOne({_id: id},{
                $set:updatedTruckInfo
            }).then(() => {
                return this.getTruckById(id);  
            }); 
        });
    },
    removeTruck(id) {
        return trucks().then((truckCollection) => {
            return truckCollection.removeOne({_id: id}).then((deletedInfo) => {
                if(deletedInfo.deletedCount === 0){
                    throw(`Could not delete truck with id ${id}`);
                }
            });
        });
    }
}

module.exports = exportedMethods;