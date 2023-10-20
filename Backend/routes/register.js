const router = require('express').Router();
const UserDB = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/register', async(req, res) =>{
    const {username, password, confirmpassword, email} = req.body

    if(!username || !password || !confirmpassword || !email){
        res.status(400).json('all fields are required')
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new UserDB({
            username: username,
            password: hashedPassword,
            confirmpassword: hashedPassword,
            email: email
        })
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
})


module.exports = router
