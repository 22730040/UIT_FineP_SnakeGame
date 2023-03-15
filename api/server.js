const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./src/utils/db')
const rootRouter = require('./src/routers/root_router')

require('dotenv').config()
app.use(cors())
app.use(express.json())

app.use('/', rootRouter)

db.connect().then(() => {
  const port = process.env.PORT || 5000

  app.listen(port, console.log(`listening to port ${port}`))
})
