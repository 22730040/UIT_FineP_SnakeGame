package handler

import (
	"encoding/json"
	"github.com/UIT-22730036/snake-api-golang/internal/repository/users_repo"
	"github.com/UIT-22730036/snake-api-golang/pkg/utils"
	"net/http"
	"strings"
)

func validateCreateUserInput(input users_repo.CreateUserInput) (users_repo.CreateUserInput, error) {
	name := input.Name
	if strings.TrimSpace(name) == "" {
		return users_repo.CreateUserInput{}, ErrNameCannotBeBlank
	}
	email := input.Email
	if strings.TrimSpace(email) == "" {
		return users_repo.CreateUserInput{}, ErrEmailCannotBeBlank
	}
	password := input.Password
	if strings.TrimSpace(password) == "" {
		return users_repo.CreateUserInput{}, ErrPasswordCannotBeBlank
	}
	role := input.Role
	if strings.TrimSpace(role) != "" && role != "ADMIN" && role != "USER" {
		return users_repo.CreateUserInput{}, ErrInvalidRole
	}
	return input, nil
}

func validateSignInInput(input users_repo.SignInInput) (users_repo.SignInInput, error) {
	email := input.Email
	if strings.TrimSpace(email) == "" {
		return users_repo.SignInInput{}, ErrEmailCannotBeBlank
	}
	password := input.Password
	if strings.TrimSpace(password) == "" {
		return users_repo.SignInInput{}, ErrPasswordCannotBeBlank
	}
	return input, nil
}

func (h *Handler) GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello"))
}

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var input users_repo.CreateUserInput
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		handleError(w, err)
		return
	}
	input, err = validateCreateUserInput(input)
	if err != nil {
		handleError(w, err)
		return
	}
	ctx := r.Context()
	user, err := h.UserCtrl.CreateUser(ctx, input)
	if err != nil {
		handleError(w, err)
		return
	}
	utils.WriteResponse(w, http.StatusCreated, user)
}

func (h *Handler) SignIn(w http.ResponseWriter, r *http.Request) {
	var input users_repo.SignInInput
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		handleError(w, err)
		return
	}
	input, err = validateSignInInput(input)
	if err != nil {
		handleError(w, err)
		return
	}
	ctx := r.Context()
	signInResponse, err := h.UserCtrl.SignIn(ctx, input)
	response := map[string]interface{}{
		"user":        signInResponse.User,
		"accessToken": signInResponse.AccessToken,
	}
	if err != nil {
		handleError(w, err)
		return
	}
	utils.WriteResponse(w, http.StatusOK, response)
}
