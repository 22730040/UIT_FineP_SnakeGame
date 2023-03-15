package handler

import (
	"github.com/UIT-22730036/snake-api-golang/internal/controller/users_controller"
	"github.com/UIT-22730036/snake-api-golang/pkg/utils"
	"net/http"
)

var (
	ErrEmailCannotBeBlank = utils.ErrorResponse{
		Status: http.StatusBadRequest,
		Code:   "invalid_input",
		Desc:   "email cannot be blank",
	}
	ErrNameCannotBeBlank = utils.ErrorResponse{
		Status: http.StatusBadRequest,
		Code:   "invalid_input",
		Desc:   "name cannot be blank",
	}
	ErrPasswordCannotBeBlank = utils.ErrorResponse{
		Status: http.StatusBadRequest,
		Code:   "invalid_input",
		Desc:   "password cannot be blank",
	}
	ErrInvalidRole = utils.ErrorResponse{
		Status: http.StatusBadRequest,
		Code:   "invalid_input",
		Desc:   "invalid role name",
	}
	ErrEmailExisted = utils.ErrorResponse{
		Status: http.StatusConflict,
		Code:   "invalid_input",
		Desc:   "user with this email existed",
	}
	ErrInternal = utils.ErrorResponse{
		Status: http.StatusInternalServerError,
		Code:   "internal",
		Desc:   "something went wrong",
	}
)

func handleError(w http.ResponseWriter, err error) {
	var newErr utils.ErrorResponse
	v, ok := err.(utils.ErrorResponse)
	if ok {
		newErr = v
	} else {
		switch err {
		case users_controller.ErrEmailExisted:
			newErr = ErrEmailExisted
			break
		default:
			newErr = ErrInternal
		}
	}
	utils.WriteResponse(w, newErr.Status, newErr)
}
