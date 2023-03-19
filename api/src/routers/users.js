const express = require('express')
const { createUser } = require('../controllers/users')
const userRouter = express.Router()

userRouter.post('/create', createUser)

module.exports = userRouter
