const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        //PK comes from .env
        jwt.sign(payload, process.env.PK, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Token cannot be created');
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT
}