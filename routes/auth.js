/* host + api/auth */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, login, refreshToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

router.post(
    '/new',
    [ //middleware
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have at least 8 chars').isLength({ min: 8 }),
        fieldValidator
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have at least 8 chars').isLength({ min: 8 }),
        fieldValidator
    ],
    login
);

router.get(
    '/renew',
    refreshToken
);

module.exports = router;