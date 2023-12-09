const express = require('express')
require('dotenv').config()
const cors = require('cors')

// Require Routers
const userRouter = require('./src/routers/user')

const app = express()
app.use(express.json())
app.use(userRouter)

const port = process.env.PORT


app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
})
