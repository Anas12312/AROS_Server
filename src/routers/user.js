const express = require('express')
const { login } = require('../services/user')

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

module.exports = router