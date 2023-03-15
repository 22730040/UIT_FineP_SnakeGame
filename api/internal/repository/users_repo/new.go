package users_repo

import (
	"context"
	"database/sql"
	"github.com/UIT-22730036/snake-api-golang/internal/models"
)

type CreateUserInput struct {
	Name     string
	Email    string
	Password string
	Role     string
}

type SignInInput struct {
	Email    string
	Password string
}

type IUser interface {
	CreateUser(ctx context.Context, input CreateUserInput) (models.User, error)
	SignIn(ctx context.Context, input SignInInput) (*models.User, error)
	ExistsUserByEmail(ctx context.Context, email string) (bool, error)
}

type impl struct {
	db *sql.DB
}

func New(db *sql.DB) IUser {
	return &impl{
		db: db,
	}
}
