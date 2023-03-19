import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const { limit = 10, page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(limit)
  const take = Number(limit)
  try {
    const users = await prisma.user.findMany({
      skip,
      take,
    })
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
