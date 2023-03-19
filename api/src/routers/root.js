const express = require('express')
const rootRouter = express.Router()
const scoreRouter = require('./scores')
const userRouter = require('./users')

rootRouter.use('/users', userRouter)
rootRouter.use('/scores', scoreRouter)

module.exports = rootRouter
