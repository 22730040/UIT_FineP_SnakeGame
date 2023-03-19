import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const { userId, page = 1, limit = 10 } = req.query
  const skip = (Number(page) - 1) * Number(limit)
  const take = Number(limit)
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const scores = await prisma.score.findMany({
      where: { playerId: userId },
      skip,
      take,
    })
    scores.sort((a, b) => {
      return b.score - a.score
    })
    res.status(200).send({ scores, player: user })
  } catch (error) {
    res.status(500).send(error.message)
  }
}
