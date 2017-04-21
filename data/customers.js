const mongoCollections = require('../db/mongoCollections');
const customers = mongoCollections.customers;
const uuid = require('uuid');



let exportedMethods = {
    getAllCustomers() {
        return customers().then((customerCollection) => {
            return customerCollection.find({}).toArray();
        });
    },
    getCustomerById(id) {
        return customers().then((customerCollection) => {
            return customerCollection.findOne({_id: id}).then((customer) => {
                if(!customer) {
                    throw("could not find customer");
                }
                return customer;
            });
        });
    },
    addCustomer(name, street, city, zip, contactNumber, contactEmail, stationList=[]) {
        return customers().then((customerCollection) => {
            let newCustomer = {
                _id: uuid.v4(),
                name: name,
                street: street,
                city: city,
                zip: zip,
                contactNumber: contactNumber,
                contactEmail: contactEmail,
                stationList: stationList
            };
            return customerCollection.insertOne(newCustomer).then((newInsert) => {
                return newInsert.insertedId;
            }).then((newId) => {
                return this.getCustomerById(newId);
            })
        });
    },
    updateCustomer(id, updatedCustomer) {
        return customers().then((customerCollection) => {
            let updatedCustomerInfo = {
                name: updatedCustomer.name,
                street: updatedCustomer.street,
                city: updatedCustomer.city,
                zip: updatedCustomer.zip,
                contactNumber: updatedCustomer.contactNumber ,
                contactEmail: updatedCustomer.contactEmail,
                stationList: updatedCustomer.stationList
            };
            return customerCollection.updateOne({_id: id},{
                $set:updatedCustomerInfo
            }).then(() => {
                console.log(this);
                return this.getCustomerById(id);  
            }); 
        });
    },
    removeCustomer(id) {
        return customers().then((customerCollection) => {
            return customerCollection.removeOne({_id: id}).then((deletedInfo) => {
                if(deletedInfo.deletedCount === 0){
                    throw(`Could not delete customer with id ${id}`);
                }
            });
        });
    }
}

module.exports = exportedMethods;