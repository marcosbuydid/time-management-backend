/* host + api/events */

const { Router } = require('express');
const router = Router();
const { validateJWT } = require('../middlewares/jwt-validator');
const { getEvents, createEvent,
    updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { dateValidator } = require('../utils/date-validator')

router.use(validateJWT);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('notes', 'Notes are required').not().isEmpty(),
        check('startDate', 'Start Date missing or format invalid').custom(dateValidator),
        check('endDate', 'End Date missing or format invalid').custom(dateValidator),
        fieldValidator
    ],
    createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;