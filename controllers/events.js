const { response } = require('express');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

const getEvents = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'get eventos'
    })
}

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {
        //token is already validated
        //no need to add more control steps here
        const token = req.header('x-token');
        const decodedToken = jwt.decode(token);

        //we get the user uid from the decoded token
        //event.user points to user uid in event model
        event.user = decodedToken.uid;
        const savedEvent = await event.save();

        res.json({
            ok: true,
            event: savedEvent
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contact database administrator'
        });
    }
}

const updateEvent = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizar evento'
    })
}

const deleteEvent = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'eliminar evento'
    })
}

module.exports = {
    getEvents, createEvent, updateEvent, deleteEvent
}