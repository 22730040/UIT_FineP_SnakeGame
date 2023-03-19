import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default async (req, res) => {
  const { userId } = req.query
  const token = req.headers.authorization
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    console.log(payload)
    if (payload.id === userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      await prisma.score.create({
        data: {
          ...req.body,
          player: {
            connect: {
              id: userId,
            },
          },
        },
      })
      res.status(201).send(`score added to user with email ${user.email}`)
    } else {
      res.status(401).send('unauthorized')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}
