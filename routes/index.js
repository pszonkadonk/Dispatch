const employeeRoutes = require('./employees');




const constructorMethod = (app) => {
    app.use('/employees', employeeRoutes);
}

module.exports = constructorMethod;