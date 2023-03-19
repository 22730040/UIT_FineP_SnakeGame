const jwt = require('jsonwebtoken')

const generateToken = payload => {
  const token = jwt.sign({ payload }, process.env.SECRET_KEY)
  return token
}

const decodeToken = token => {
  const decode = jwt.verify(token, process.env.SECRET_KEY)
  return decode
}

module.exports = { generateToken, decodeToken }
