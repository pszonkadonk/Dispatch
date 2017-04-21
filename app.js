const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
const configRoutes = require('./routes');

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(static);

configRoutes(app);







app.listen(3000, () => {
    console.log("Listening on server 3000....");
});