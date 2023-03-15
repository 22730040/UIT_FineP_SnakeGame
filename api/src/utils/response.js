const handleResponse = (res, code, payload) => {
  res.status(code).send(payload)
}

module.exports = { handleResponse }
