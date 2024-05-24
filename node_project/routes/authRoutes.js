const { signup , login } = require('../controller/authController');
const { validateCreateUser } = require('../Middleware/validators/validationMiddleware')
const router = require('express').Router();

router.route('/signup').post( validateCreateUser ,signup);

router.route('/login').post(login);

module.exports = router;
