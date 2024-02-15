const moment = require('moment');

const dateValidator = (value, { req, location, path }) => {

    const date = moment(value);

    return (value && date.isValid());

}

module.exports = { dateValidator }