package users_controller

import (
	"context"
	"github.com/UIT-22730036/snake-api-golang/internal/models"
	"github.com/UIT-22730036/snake-api-golang/internal/repository"
	"github.com/UIT-22730036/snake-api-golang/internal/repository/users_repo"
)

type SignInResponse struct {
	User        *models.User
	AccessToken string
}

type UserCtrl interface {
	CreateUser(ctx context.Context, input users_repo.CreateUserInput) (models.User, error)
	SignIn(ctx context.Context, input users_repo.SignInInput) (SignInResponse, error)
}

type impl struct {
	repo repository.IRepo
}

func New(repo repository.IRepo) UserCtrl {
	return &impl{
		repo: repo,
	}
}
