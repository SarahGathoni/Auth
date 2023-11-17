const router = require('express').Router();
const UserDB = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { user, email, pwd, matchPwd } = req.body;

  if (!user || !email || !pwd || !matchPwd) {
    return res.status(400).json('All fields are required');
  }

  
  // Check for duplicates
  const existingUser = await UserDB.findOne({ $or: [{ user }, { email }] });

  if (existingUser) {
    return res.status(400).json('Username or email already exists');
  }
try{
  // Create a new user
 const newUser = new UserDB({
    user: user || '', // Ensure a non-null value for username
    email: email,
    pwd: await bcrypt.hash(pwd, 10),
    matchPwd: await bcrypt.hash(matchPwd, 10),
  });

  console.log('Received registration request:', req.body);

  
    // Save the new user
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
    console.log('Data saved successfully');
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log('Error saving data to MongoDB:', err);
  }
});

module.exports = router;
