const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const { generateToken } = require('../utils/jwt')
const prisma = new PrismaClient()

const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hash,
      },
    })
    res.status(201).send(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    })
    if (user) {
      const isOk = await bcrypt.compare(req.body.password, user.password)
      if (isOk) {
        const token = generateToken(user)
        res.status(200).send({ user, accessToken: token })
      } else {
        res.status(409).send('wrong login information')
      }
    } else {
      res.status(404).send('user not found')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getUsers = async (req, res) => {
  const { limit = 10, page = 1 } = req.query
  try {
    const users = await prisma.user.findMany({
      skip: Number((page - 1) * limit),
      take: Number(limit),
    })
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = { createUser, login, getUsers }
