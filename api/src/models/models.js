const mongoose = require('mongoose')
const moment = require('moment')

const scoreSchema = new mongoose.Schema({
  score: Number,
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: moment().toDate() },
  updatedAt: { type: Date, default: moment().toDate() },
})

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  role: { type: String, default: 'USER' },
  password: String,
  scores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }],
})

const Score = mongoose.model('Score', scoreSchema)
const User = mongoose.model('User', userSchema)

module.exports = { Score, User }
