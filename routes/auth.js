/* host + api/auth */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, login, refreshToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

router.post(
    '/signup',
    [ //middleware
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have at least 8 chars').isLength({ min: 8 }),
        fieldValidator
    ],
    createUser
);

router.post(
    '/login',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have at least 8 chars').isLength({ min: 8 }),
        fieldValidator
    ],
    login
);

router.get(
    '/refresh',
    validateJWT,
    refreshToken
);

module.exports = router;