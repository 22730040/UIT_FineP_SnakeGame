const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

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
    console.log(user)
    res.status(201).send(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = { createUser }

exports.handler = async (event, context, callback) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ up: true }),
  }
}
