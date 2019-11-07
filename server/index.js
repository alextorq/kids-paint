const express           = require('express');
let appRoot             = require('app-root-path');
let houseRoute          = require(appRoot + '/server/routes/picture');
const listEndpoints     = require('express-list-endpoints');
const cors                = require('cors');
let bodyParser          = require('body-parser');

require('dotenv').config();

const app  = express();
const port = process.env.EXPRESS_PORT || 4000;
app.listen(port);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(appRoot + '/public'));
app.use('/pic', houseRoute);


console.log(listEndpoints(app));
console.log(port)
