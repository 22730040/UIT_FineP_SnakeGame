const express = require('express')
const cors = require('cors')
const rootRouter = require('./src/routers/root')
const app = express()

require('dotenv').config()
app.use(cors())
app.use(express.json())

app.use('/api', rootRouter)

const port = process.env.PORT || 5000

app.listen(port, console.log(`listening to port ${port}`))
