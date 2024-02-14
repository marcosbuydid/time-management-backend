const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../utils/jwt');



const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user !== null) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already in use'
            });
        }

        user = new User(req.body);

        //encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //save user on database
        await user.save();

        //generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact database administrator'
        });
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user === null) {
            return res.status(400).json({
                ok: false,
                msg: 'User or Password are invalid'
            });
        }

        //check if passwords match
        const validatePassword = bcrypt.compareSync(password, user.password);

        //response is true or false
        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: 'User or Password are invalid'
            });
        }

        //generate JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact database administrator'
        });
    }
}

const refreshToken = async (req, res = response) => {

    const { uid, name } = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token: token
    })
}

module.exports = {
    createUser, login, refreshToken
}