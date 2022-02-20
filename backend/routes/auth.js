const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');




// create a user using: POst "/api/auth/createuser". no login require
router.post('/createuser', [
  body('name', 'enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {
  // Id there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // chech wheather the user with this email exists already
try {
    if (await User.findOne({ email: req.body.email })) {        // this is a promise we should wait for resolve
    return res.status(400).json({ error: "sorry a user with this email already exists" })
    }
    //create new user
    let user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json({ user });
  } 
catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured");
}
})

module.exports = router;