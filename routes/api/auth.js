const express = require('express');
const router = express.Router();

// middleware
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// mongoo models
const Admin = require('../../models/Admin');

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
      'Please enter a password with 8 or more characters'
    ).isLength({ min: 8 }),
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

    try {
      // search if an admin with this emnail exists

      const admin = await Admin.findOne({ email });

      if (!admin) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentials0' }] });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      const isMatch1 = await bcrypt.compare(secretKey, admin.secretKey);
      // test if the code matches

      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      if (!isMatch1) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentials1' }] });
      }

      // return the jsonwebtoken
      const payload = {
        user: {
          id: admin.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error.');
    }
  }
);

// @route -- POST api/auth/create
// @desc -- Create an admin account
// @access -- Public...
router.post(
  '/create',
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
    check('secretKey', 'Please enter a valid secretKey').trim().not().isEmpty(),
    check('name', 'name is required').trim().not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there where we return an error object with the array of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // we deconstruct the form data from req.body
    const { email, password, secretKey, name } = req.body;

    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Admin already exists' }] });
      }

      admin = new Admin({ name, email, secretKey, password });
      // encrypt password and secret key
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      admin.secretKey = await bcrypt.hash(secretKey, salt);
      await admin.save();

      return res.json(admin);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route -- POST api/auth/changeAdminPassword
// @desc      Change Admin Password
// @access -- Private
router.post(
  '/changeAdminPassword',
  [
    auth,
    [
      check('oldPassword', 'Please fill in your old password')
        .trim()
        .not()
        .isEmpty(),
      check('secretKey', 'Please fill in your secret key')
        .trim()
        .not()
        .isEmpty(),
      check('newPassword', 'Please enter a password with 8 or more characters')
        .trim()
        .isLength({ min: 8 })
    ]
  ],
  async (req, res) => {
    // do things
  }
);
module.exports = router;
