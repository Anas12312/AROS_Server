const express = require('express')
const { login, signup } = require('../services/user')

const router = new express.Router

// Login
router.post('/login', async (req, res) => {
    const payload = {
        email: req.body.email,
        password: req.body.password
    }
    const user = await login(payload)
    if(!user) {
        return res.status(400).send({
            message: 'Authentication Failed! Email or Password might be wrong!'
        })
    }
    return res.send(user)
})

// Signup
router.post('/signup', async (req, res) => {
    const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    const user = await signup(payload)

    if(!user) {
        return res.status(400).send({
            message: 'Signup Failed!'
        })
    };

    if(user === 'All fields are required!') {
        return res.status(400).send({
            message: 'All fields are required!'
        })
    };

    if(user === 'Invalid Email!') {
        return res.status(400).send({
            message: 'Invalid Email!'
        })
    };

    if(user === 'Password must be at least 6 characters!') {
        return res.status(400).send({
            message: 'Password must be at least 6 characters!'
        })
    }

    return res.send(user)
});

module.exports = router