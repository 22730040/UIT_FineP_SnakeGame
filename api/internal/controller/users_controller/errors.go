package users_controller

import "errors"

var (
	ErrEmailExisted   = errors.New("user with this email existed")
	ErrWrongLoginInfo = errors.New("wrong login information")
)
