const express = require('express')
const { createUser } = require('../../functions/users')
const userRouter = express.Router()

userRouter.post('/create', createUser)

module.exports = userRouter
