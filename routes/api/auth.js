const express = require('express');
const router = express.Router();

// middleware
const auth = require('../../middleware/auth');

// tools
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// mongoose models
const Admin = require('../../models/Admin');

// @route -- GET api/auth
// @desc -- Test route
// @access -- Public
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
        admin: {
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
      check('newPassword', 'Please enter a password with 6 or more characters')
        .trim()
        .isLength({ min: 6 })
        .custom((value, { req }) => {
          if (value !== req.body.confirmNewPassword) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match");
          } else {
            return value;
          }
        }),
      check(
        'confirmNewPassword',
        'Please enter a password with 67 or more characters'
      )
        .trim()
        .isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    // checkif there were any errors durring the validation
    const errors = validationResult(req);
    // if there where we return an error object with the array of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // we deconstruct the form data from req.body
    const { oldPassword, newPassword, secretKey } = req.body;
    try {
      let admin = await Admin.findById(req.admin.id);
      if (!admin) {
        res
          .status(400)
          .json({ errros: [{ msg: 'An error has occured please try again' }] });
      }
      // check if secretKey and old password match db values
      let isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'An error has occured please try again' }] });
      }
      let isMatch1 = await bcrypt.compare(secretKey, admin.secretKey);

      if (!isMatch1) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'An error has occured please try again' }] });
      }
      // hash new password
      const salt = await bcrypt.genSalt(10);
      let hashedPass = await bcrypt.hash(newPassword, salt);

      admin = await Admin.findByIdAndUpdate(req.admin.id, {
        password: hashedPass
      });

      res.json({ errors: [{ msg: 'Password Changed' }] });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error.');
    }
  }
);

// @route -- POST api/auth/changeAdminSecret
// @desc --  Change Admin Secret
// @access -- Private
router.post(
  '/changeAdminSecret',
  [
    auth,
    [
      check('password', 'Please fill in your password.').trim().exists(),
      check('oldSecret', 'Plese fill in your old secret.').trim().exists(),
      check(
        'newSecret',
        'Plese enter a new secret key with 6 or more characters.'
      )
        .trim()
        .isLength({ min: 6 }),
      check(
        'confirmNewSecret',
        'Plese enter the confiramtion secret key with 6 or more characters.'
      )
        .trim()
        .isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    // check if all fields are filled properly
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // deconstruct the req.body
    const { password, odlSecret, newSecret } = req.body;

    try {
      // check if admin exists
      let admin = await Admin.findById(req.admin.id);
      if (!admin)
        res
          .status(404)
          .json({ errors: [{ msg: 'An error has occured please try again' }] });

      // check if password and secretKey match db values
      let isMatch = bcrypt.compare(password, admin.password);
      if (!isMatch)
        res
          .status(400)
          .json({ errors: [{ msg: 'An error has occured please try again' }] });

      isMatch = bcrypt.compare(odlSecret, admin.secretKey);
      if (!isMatch)
        res
          .status(400)
          .json({ errors: [{ msg: 'An error has occured please try again' }] });

      // generate salt
      const salt = await bcrypt.genSalt(10);
      //hash new secretKey
      let hashedSecretKey = await bcrypt.hash(newSecret, salt);

      admin = await Admin.findByIdAndUpdate(req.admin.id, {
        secretKey: hashedSecretKey
      });

      res.json({ error: [{ msg: 'Secret key successfully updated.' }] });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
