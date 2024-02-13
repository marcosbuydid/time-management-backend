//same as import from
const express = require('express');
require('dotenv').config();

//express server creation
const app = express();

//public directory
app.use(express.static('public'));

//routes
app.use('/api/auth', require('./routes/auth'));

//requests listening
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

