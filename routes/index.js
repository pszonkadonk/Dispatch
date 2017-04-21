const employeeRoutes = require('./employees');
const truckRoutes = require('./trucks');
const customerRoutes = require('./customers');
const stationRoutes = require('./stations');



const constructorMethod = (app) => {
    app.use('/employees', employeeRoutes);
    app.use('/trucks', truckRoutes);
    app.use('/customers', customerRoutes);
    app.use('/station', stationRoutes);
    
    app.get('/login', (req,res) => {
        res.render('utilities/login');
    });

    app.get('/signup', (req,res) => {
        
    })
}

module.exports = constructorMethod;