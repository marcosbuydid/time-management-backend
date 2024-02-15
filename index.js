//same as import from
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//express server creation
const app = express();

//database
dbConnection();

//CORS
app.use(cors());

//public directory
app.use(express.static('public'));

//read and parse
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//requests listening
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

