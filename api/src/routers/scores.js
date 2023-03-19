const express = require('express')
const scoreRouter = express.Router()
const {
  addScore,
  getScores,
  getScoresOfUser,
} = require('../controllers/scores')

scoreRouter.get('/get', getScores)
scoreRouter.get('/:userId/get', getScoresOfUser)

scoreRouter.post('/:userId/add', addScore)

module.exports = scoreRouter
