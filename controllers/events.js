const { response } = require('express');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events: events
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

    const eventId = await req.params.id;

    try {
        const token = req.header('x-token');
        const decodedToken = jwt.decode(token);

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found with this id'
            })
        }

        if (event.user.toString() !== decodedToken.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User cannot perform this action'
            })
        }

        const data = {
            ...req.body,
            user: decodedToken.uid
        }

        const eventToUpdate = await Event.findByIdAndUpdate(eventId, data, { new: true });

        res.json({
            ok: true,
            event: eventToUpdate
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contact database administrator'
        });
    }
}

const deleteEvent = async (req, res = response) => {

    const eventId = await req.params.id;

    try {
        const token = req.header('x-token');
        const decodedToken = jwt.decode(token);

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found with this id'
            })
        }

        if (event.user.toString() !== decodedToken.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User cannot perform this action'
            })
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            msg: 'Event deleted successfully'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contact database administrator'
        });
    }
}

module.exports = {
    getEvents, createEvent, updateEvent, deleteEvent
}