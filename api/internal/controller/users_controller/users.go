package users_controller

import (
	"context"
	"github.com/UIT-22730036/snake-api-golang/internal/models"
	"github.com/UIT-22730036/snake-api-golang/internal/repository/users_repo"
	"github.com/UIT-22730036/snake-api-golang/pkg/bcrypt"
	"github.com/UIT-22730036/snake-api-golang/pkg/jwt"
	"os"
)

func (i *impl) CreateUser(ctx context.Context, input users_repo.CreateUserInput) (models.User, error) {
	existed, err := i.repo.User().ExistsUserByEmail(ctx, input.Email)
	if err != nil {
		return models.User{}, err
	}
	if existed {
		return models.User{}, ErrEmailExisted
	}
	hash := bcrypt.GenerateHash(input.Password)
	input.Password = hash
	user, err := i.repo.User().CreateUser(ctx, input)
	if err != nil {
		return models.User{}, err
	}
	return user, nil
}

func (i *impl) SignIn(ctx context.Context, input users_repo.SignInInput) (SignInResponse, error) {
	user, err := i.repo.User().SignIn(ctx, input)
	if err != nil {
		return SignInResponse{}, err
	}
	err = bcrypt.Compare(input.Password, user.Password)
	if err != nil {
		return SignInResponse{}, ErrWrongLoginInfo
	}
	secretKey := os.Getenv("SECRET_KEY")
	jwtInput := jwt.InputJwt{
		ID:        user.ID,
		Email:     user.Email,
		Role:      user.Role,
		SecretKey: secretKey,
	}
	token := jwt.GenerateToken(jwtInput)
	return SignInResponse{
		User:        user,
		AccessToken: token,
	}, nil
}
