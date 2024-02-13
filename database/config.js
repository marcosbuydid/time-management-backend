const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Database is Online');
    }
    catch (error) {
        console.log(error);
        throw new Error('Something went wrong. Cannot initialize the database');
    }
}

module.exports = {
    dbConnection
}