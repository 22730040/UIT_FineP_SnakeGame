const ErrEmailCannotBeBlank = {
  code: 400,
  message: 'Email cannot be blank!',
}
const ErrNameCannotBeBlank = {
  code: 400,
  message: 'Name cannot be blank!',
}
const ErrPasswordCannotBeBlank = {
  code: 400,
  message: 'Password cannot be blank!',
}
const ErrInvalidRole = {
  code: 400,
  message: 'Invalid role!',
}
const ErrExistedEmail = {
  code: 409,
  message: 'User with this email existed!',
}
const ErrWrongLoginInfo = {
  code: 409,
  message: 'Wrong login information!',
}
const ErrNoUserFound = {
  code: 404,
  message: 'No user found!',
}
const ErrUnAuthorized = {
  code: 401,
  message: 'Unauthorized action!',
}
const StatusCreated = 201
const StatusInternalError = 500
const StatusOK = 200

module.exports = {
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
  ErrUnAuthorized,
}
