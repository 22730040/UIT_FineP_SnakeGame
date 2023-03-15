const jwt = require('jsonwebtoken')

const generateToken = payload => {
  const token = jwt.sign({ payload }, process.env.SECRET)
  return token
}

const decodeToken = token => {
  const claims = jwt.verify(token, process.env.SECRET)
  return claims
}

module.exports = { generateToken, decodeToken }
