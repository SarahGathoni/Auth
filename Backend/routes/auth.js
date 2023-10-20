const router = require('express').Router();
const userDB = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const findUser = await userDB.findOne({ username: username });

        if (!findUser) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const matchPassword = await bcrypt.compare(password, findUser.password);

        if (matchPassword) {
            // Create JWT or send success response
            return res.json({ success: `User ${username} is logged in` });
        } else {
            // Passwords do not match, unauthorized access
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
