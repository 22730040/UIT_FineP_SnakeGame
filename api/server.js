const express = require('express')
const app = express()
const cors = require('cors')
const rootRouter = require('./functions/root')
const serverless = require('serverless-http')

require('dotenv').config()
app.use(cors())
app.use(express.json())

app.use('/.netlify/functions/server', rootRouter)

const port = process.env.PORT || 5000

app.listen(port, console.log(`listening to port ${port}`))

module.exports.handler = serverless(app)
