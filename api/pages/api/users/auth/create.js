import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hash,
      },
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
