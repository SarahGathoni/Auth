const router = require('express').Router();
const UserDB = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/register', async(req, res) =>{
    const {user, email, pwd, matchPwd} = req.body

    if(!user || !email || !pwd || !matchPwd){
        res.status(400).json('all fields are required')
    }
    try {
        const hashedPassword = await bcrypt.hash(pwd, 10)
        const newUser = new UserDB({
            user: user,
            email: email,
            pwd: hashedPassword,
            matchPwd: hashedPassword
            
        })
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
})


module.exports = router
