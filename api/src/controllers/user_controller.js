const { User, Score } = require('../models/models')
const bcrypt = require('../utils/bcrypt')
const { handleResponse } = require('../utils/response')
const isEmpty = require('lodash/isEmpty')
const { generateToken } = require('../utils/jwt')
const {
  ErrEmailCannotBeBlank,
  ErrNameCannotBeBlank,
  ErrPasswordCannotBeBlank,
  ErrInvalidRole,
  ErrExistedEmail,
  StatusCreated,
  StatusInternalError,
  StatusOK,
  ErrWrongLoginInfo,
  ErrNoUserFound,
} = require('../constants')

const validateCreateUserInput = async input => {
  let error = null
  if (isEmpty(input.email)) {
    error = ErrEmailCannotBeBlank
  } else if (!isEmpty(input.email)) {
    const existed = await existedUserEmail(input.email)
    if (existed) {
      error = ErrExistedEmail
    }
  } else if (isEmpty(input.name)) {
    error = ErrNameCannotBeBlank
  } else if (isEmpty(input.password)) {
    error = ErrPasswordCannotBeBlank
  } else if (input.role !== 'ADMIN' && input.role !== 'USER') {
    error = ErrInvalidRole
  }
  return error
}

const existedUserEmail = async email => {
  const user = await User.findOne({ email })
  return user
}

const createUser = async (req, res) => {
  const { password } = req.body
  const error = await validateCreateUserInput(req.body)
  if (error) {
    handleResponse(res, error.code, error)
  } else {
    try {
      const hash = await bcrypt.hashPassword(password)
      const user = await User.create({ ...req.body, password: hash })
      handleResponse(res, 201, {
        code: StatusCreated,
        message: 'User created!',
      })
    } catch (err) {
      handleResponse(res, StatusInternalError, {
        code: StatusInternalError,
        message: err.message,
      })
    }
  }
}

const signIn = async (req, res) => {
  const { email, password } = req.body
  const user = await existedUserEmail(email)
  try {
    if (user) {
      const isValid = await bcrypt.comparePassword(password, user.password)
      if (isValid) {
        const token = generateToken(user)
        handleResponse(res, StatusOK, {
          code: StatusOK,
          response: {
            accessToken: token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          },
        })
      } else {
        handleResponse(res, ErrWrongLoginInfo.code, ErrWrongLoginInfo)
      }
    } else {
      handleResponse(res, ErrNoUserFound.code, ErrNoUserFound)
    }
  } catch (error) {
    handleResponse(res, StatusInternalError, {
      code: StatusInternalError,
      message: error.message,
    })
  }
}

const getUsers = async (req, res) => {
  const { limit = 10, page = 1 } = req.query
  try {
    const users = await User.find()
      .skip(limit * page - limit)
      .limit(limit)
    handleResponse(res, StatusOK, {
      code: StatusOK,
      users: users.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
      })),
    })
  } catch (error) {
    handleResponse(res, StatusInternalError, {
      code: StatusInternalError,
      message: error.message,
    })
  }
}

module.exports = { createUser, signIn, getUsers }
