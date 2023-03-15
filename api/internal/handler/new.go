package handler

import "github.com/UIT-22730036/snake-api-golang/internal/controller/users_controller"

type Handler struct {
	UserCtrl users_controller.UserCtrl
}

func NewHandler(userCtrl users_controller.UserCtrl) Handler {
	return Handler{
		UserCtrl: userCtrl,
	}
}
