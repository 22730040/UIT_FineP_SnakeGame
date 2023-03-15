const express = require('express')
const scoreRouter = express.Router()
const scoreController = require('../controllers/score_controller')

scoreRouter.get('/get', scoreController.getAllUserScore)

scoreRouter.post('/add', scoreController.addScore)

module.exports = scoreRouter
