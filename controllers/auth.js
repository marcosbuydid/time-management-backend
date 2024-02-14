const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user !== null) {
            return res.status(400).json({
                ok: false,
                msg: 'User already defined with this email'
            });
        }

        user = new User(req.body);

        //encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //save user on database
        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
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

        res.json({
            ok: true,
            uid: user.id,
            name: user.name
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact database administrator'
        });
    }
}

const refreshToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser, login, refreshToken
}