const express = require('express');
const router = express.Router();

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
router.post('/', (req, res) => {});
module.exports = router;
