const {
  StatusOK,
  StatusInternalError,
  StatusCreated,
  ErrNoUserFound,
  ErrUnAuthorized,
} = require('../constants')
const { User, Score } = require('../models/models')
const { decodeToken } = require('../utils/jwt')
const { handleResponse } = require('../utils/response')

const getAllScores = async (req, res) => {
  const { limit = 10, page = 1 } = req.query
  try {
    const scores = await Score.find()
      .skip(limit * page - limit)
      .limit(limit)
      .populate('player', '_id name email')
    scores.sort((a, b) => {
      return b.score - a.score
    })
    handleResponse(res, StatusOK, {
      code: StatusOK,
      scores,
    })
  } catch (error) {
    handleResponse(res, StatusInternalError, {
      code: StatusInternalError,
      message: error.message,
    })
  }
}

const getAllUserScore = async (req, res) => {
  const { userId } = req.params
  const { limit = 10, page = 1 } = req.query
  try {
    const scores = await Score.find({ player: userId })
      .skip(limit * page - limit)
      .limit(limit)

    const player = await User.findById(userId)
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
  const { userId } = req.params
  const { payload } = decodeToken(token)
  if (userId === payload._id) {
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
  } else {
    handleResponse(res, ErrUnAuthorized.code, ErrUnAuthorized)
  }
}

module.exports = { addScore, getAllUserScore, getAllScores }
