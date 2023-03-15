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

module.exports = {
  ErrEmailCannotBeBlank,
  ErrNameCannotBeBlank,
  ErrPasswordCannotBeBlank,
  ErrInvalidRole,
  ErrExistedEmail,
}
