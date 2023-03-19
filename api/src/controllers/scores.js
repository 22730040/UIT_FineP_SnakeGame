const { PrismaClient } = require('@prisma/client')
const { decodeToken } = require('../utils/jwt')
const prisma = new PrismaClient()

const addScore = async (req, res) => {
  const { userId } = req.params
  const token = req.headers.authorization
  const { payload } = decodeToken(token)
  if (payload.id === userId) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      const score = await prisma.score.create({
        data: {
          ...req.body,
          player: {
            connect: {
              id: userId,
            },
          },
        },
      })
      console.log(score)
      res.status(201).send(`score added to user with email ${user.email}`)
    } catch (error) {
      res.status(500).send(error.message)
    }
  } else {
    res.status(401).send('unauthorized action')
  }
}

const getScores = async (req, res) => {
  const { limit = 10, page = 1 } = req.query
  try {
    const scores = await prisma.score.findMany({
      skip: Number((page - 1) * limit),
      take: Number(limit),
      include: {
        player: {
          select: {
            email: true,
          },
        },
      },
    })
    scores.sort((a, b) => b.score - a.score)
    res.status(200).send(scores)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getScoresOfUser = async (req, res) => {
  const { limit = 10, page = 1 } = req.query
  const { userId } = req.params
  try {
    const scores = await prisma.score.findMany({
      where: {
        playerId: userId,
      },
      skip: Number((page - 1) * limit),
      take: Number(limit),
    })
    scores.sort((a, b) => b.score - a.score)
    res.status(200).send(scores)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = { addScore, getScores, getScoresOfUser }
