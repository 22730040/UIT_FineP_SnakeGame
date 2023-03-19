const express = require('express')
const userRouter = express.Router()
const { createUser, login, getUsers } = require('../controllers/users')

userRouter.get('/get', getUsers)

userRouter.post('/auth/create', createUser)
userRouter.post('/auth/login', login)

module.exports = userRouter
