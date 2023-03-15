const express = require('express')
const scoreRouter = express.Router()
const scoreController = require('../controllers/score_controller')

scoreRouter.get('/:userId/get', scoreController.getAllUserScore)
scoreRouter.get('/get', scoreController.getAllScores)

scoreRouter.post('/:userId/add', scoreController.addScore)

module.exports = scoreRouter
