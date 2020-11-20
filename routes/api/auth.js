const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Admin = require('../../models/admin');

// @route -- GET api/auth
// @desc -- Test route
// @access -- Public

// TODO: hash the password both from the front and the back-end

router.get('/', (req, res) => {
  res.send('Auth route.');
});

// @route -- POST api/auth
// @desc -- Login into admins account
// @access -- Public...
router.post(
  '/',
  [
    check('email', 'Please enter a valid email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('secretKey', 'Please enter a valid secretKey').trim().not().isEmpty()
  ],
  async (req, res) => {
    // checkif there were any errors durring the validation
    const errors = validationResult(req);
    // if there where we return an error object with the array of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // we deconstruct the form data from req.body
    const { email, password, secretKey } = req.body;
  }
);
module.exports = router;
