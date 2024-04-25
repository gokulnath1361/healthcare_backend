const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Enrolldata = require('../models/enrollSchema');

router.post('/enrollment', [
  check('hospital_name').notEmpty().withMessage('hospital_name is required'),
  check('doctor_name').notEmpty().withMessage('doctor_name is required'),
  check('treatments').notEmpty().withMessage('treatments is required'),
  check('feedback').notEmpty().withMessage('feedback is required'),
  check('address').notEmpty().withMessage('address is required'),
  check('email').notEmpty().withMessage('email is required'),
  check('contact').notEmpty().withMessage('contact is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { hospital_name, doctor_name,treatments,feedback, address,email, contact  } = req.body;

  try {
    let enrolluser = await Enrolldata.findOne({ email });
    if (enrolluser) {
      return res.status(400).json({ msg: 'This Email already exists' });
    }

    enrolluser = new Enrolldata({
        hospital_name, doctor_name,treatments,feedback, address, email, contact 
    });

    await enrolluser.save();

    res.status(200).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
