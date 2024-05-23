const { signup , login } = require('../controller/authController');
const {validateUser} = require('../validators/validateUser')
const router = require('express').Router();

router.route('/signup').post( validateUser, signup);

router.route('/login').post(login);

module.exports = router;
