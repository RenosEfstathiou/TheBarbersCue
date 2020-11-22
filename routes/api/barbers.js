const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// middleware
const auth = require('../../middleware/auth');

// mongoose models
const Barber = require('../../models/Barber');

// @Route -- Get api/barbers/
// @Desc -- Return all barbers
// @Access --  Public
router.get('/', async (req, res) => {
  try {
    const barbers = await Barber.find();

    res.json(barbers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error.');
  }
});

// @Route -- Post api/barbers/
// @Desc -- Create a Barber
// @Access --  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Please enter the barbers name').trim().not().isEmpty(),
      check(),
      check('phone', 'Please enter the barbers phone ')
        .trim()
        .isLength({ min: 10, max: 10 }),
      check('email', 'Please enter the barbers email').trim().not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone } = req.body;

    try {
      let barber = await Barber.findOne({ email });
      if (barber)
        return res
          .status(500)
          .json({ errors: [{ msg: 'Barber already exists' }] });

      barber = new Barber({ name, email, phone });

      await barber.save();

      res.json(barber);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error.');
    }
  }
);

// @Route -- Delete api/barbers/
// @Desc -- Delete a Barber
// @Access --  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Barber.findByIdAndDelete(req.params.id);
    if (!deleted) res.json({ errors: [{ msg: 'Barber not found ' }] });
    res.json({
      errors: [{ msg: `${deleted.name} has been deleted.` }]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
