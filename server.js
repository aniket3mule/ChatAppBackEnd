require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/Routes');
const expressValidator = require('express-validator');
const cors = require('cors');
const PORT = 3001;
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(expressValidator());
app.use('/', route);
app.listen(PORT, () => {
    console.log('Litsning on port : ' + PORT);
})