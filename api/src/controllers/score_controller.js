const {
  StatusOK,
  StatusInternalError,
  StatusCreated,
  ErrNoUserFound,
} = require('../constants')
const { User, Score } = require('../models/models')
const { decodeToken } = require('../utils/jwt')
const { handleResponse } = require('../utils/response')

const getAllUserScore = async (req, res) => {
  const token = req.headers.authorization
  const { payload } = decodeToken(token)
  try {
    const scores = await Score.find({ player: payload._id })
    const player = await User.findById(payload._id)
    scores.sort((a, b) => {
      return b.score - a.score
    })
    handleResponse(res, StatusOK, {
      code: StatusOK,
      data: {
        scores: scores.map(score => ({
          _id: score._id,
          score: score.score,
          createdAt: score.createdAt,
        })),
        player: {
          _id: player._id,
          name: player.name,
          email: player.email,
        },
      },
    })
  } catch (error) {
    handleResponse(res, StatusInternalError, {
      code: StatusInternalError,
      message: error.message,
    })
  }
}

const addScore = async (req, res) => {
  const token = req.headers.authorization
  const { payload } = decodeToken(token)
  try {
    const user = await User.findById(payload._id)
    if (user) {
      const score = await Score.create({ ...req.body })
      user.scores.push(score._id)
      score.player = user._id
      await score.save()
      await user.save()
      handleResponse(res, StatusCreated, {
        code: StatusCreated,
        message: `Score added to player with an email ${user.email}!`,
      })
    } else {
      handleResponse(res, ErrNoUserFound.code, ErrNoUserFound)
    }
  } catch (error) {
    handleResponse(res, StatusInternalError, {
      code: StatusInternalError,
      message: error.message,
    })
  }
}

module.exports = { addScore, getAllUserScore }
