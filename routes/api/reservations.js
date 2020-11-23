const express = require('express');
const router = express.Router();

// middleware
const auth = require('../../middleware/auth');

// modules
const { check, validationResult } = require('express-validator');

// mongoose models

const Reservation = require('../../models/Reservations');
const Barber = require('../../models/Barber');

// @route -- GET api/reservations
// @desc -- Test route
// @access -- Public

router.get('/', (req, res) => {
  res.send('Reservations route.');
});

// @route -- Post api/reservations/:barber_id
// @desc -- Make a reservation
// @access -- Public
router.post(
  '/:barberId',
  [
    check('name', 'Please fill in your name.').trim().notEmpty(),
    check('phone', 'Please enter a valid phone.')
      .trim()
      .isLength({ min: 10, max: 10 }),
    check('email', 'Please enter a valid email adress').trim().isEmail(),
    // we could also check .exists() but why not go the long way arround  ...
    check('barber', 'Please select a barber').trim().not().isEmpty(),
    check('date', 'Please select a date').trim().not().isEmpty(),
    check('hour', 'Please select a reservation hour').trim().not().isEmpty()
  ],
  async (req, res) => {
    // check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    //deconstruct the req body
    const { name, phone, email, date, hour } = req.body;

    try {
      let barberDb = await Barber.findById(req.params.barberId);

      if (!barberDb)
        res
          .status(400)
          .json({ errors: [{ msg: 'An error has occured please try again' }] });

      let reservation = new Reservation({
        name,
        phone,
        email,
        barber: { id: barberDb.id, name: barberDb.name },
        date,
        hour
      });
      reservation = await reservation.save();
      barberDb.reservations.unshift(reservation.id);
      await barberDb.save();

      res.json({ reservation });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error.');
    }
  }
);

//TODO: get all reservatuons of a user
//TODO: Delete a reservation

module.exports = router;
