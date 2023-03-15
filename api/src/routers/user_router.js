const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user_controller')

userRouter.post('/create', userController.createUser)
userRouter.post('/sign-in', userController.signIn)

module.exports = userRouter
