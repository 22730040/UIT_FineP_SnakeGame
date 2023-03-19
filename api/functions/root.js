const express = require('express')
const userRouter = require('../src/routers/users')

const rootRouter = express.Router()

rootRouter.get('/', (req, res) => res.status(200).send('OK'))
rootRouter.use('/users', userRouter)

module.exports = rootRouter
