const express = require('express');
const router = express.Router();

// @route -- GET api/reservations
// @desc -- Test route
// @access -- Public

router.get('/', (req, res) => {
  res.send('Reservations route.');
});

module.exports = router;
