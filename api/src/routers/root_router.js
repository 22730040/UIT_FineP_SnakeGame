const express = require('express')
const rootRouter = express.Router()
const userRouter = require('./user_router')
const scoreRouter = require('./score_router')

rootRouter.use('/users', userRouter)
rootRouter.use('/scores', scoreRouter)

module.exports = rootRouter
