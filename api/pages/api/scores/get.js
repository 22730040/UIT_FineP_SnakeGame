import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const skip = (Number(page) - 1) * Number(limit)
  const take = Number(limit)
  try {
    const scores = await prisma.score.findMany({
      skip,
      take,
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
