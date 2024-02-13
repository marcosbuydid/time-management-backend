//same as import from
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//express server creation
const app = express();

//database
dbConnection();

//public directory
app.use(express.static('public'));

//read and parse
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));

//requests listening
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

