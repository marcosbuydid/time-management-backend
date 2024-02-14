const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async (req, res = response, next) => {

    // x-token on headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token found on the request'
        });
    }

    try {
        jwt.verify(token, process.env.PK);

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        });
    }

    next();
}

module.exports = {
    validateJWT
}