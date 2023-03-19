import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      const isOk = await bcrypt.compare(password, user.password)
      if (isOk) {
        const token = jwt.sign(user, process.env.SECRET_KEY)
        console.log({ user, accessToken: token })
        res.status(200).send({ user, accessToken: token })
      } else {
        res.status(401).send('unauthorized')
      }
    } else {
      res.status(404).send('user not found')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}
