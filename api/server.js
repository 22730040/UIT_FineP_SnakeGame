const express = require('express')
const app = express()
const cors = require('cors')
const rootRouter = require('./src/routers/root')

require('dotenv').config()
app.use(cors())
app.use(express.json())

app.use('/', rootRouter)

const port = process.env.PORT || 5000

app.listen(port, console.log(`listening to port ${port}`))
