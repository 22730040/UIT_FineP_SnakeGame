package users_repo

import (
	"context"
	"github.com/UIT-22730036/snake-api-golang/internal/models"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

func (i *impl) CreateUser(ctx context.Context, input CreateUserInput) (models.User, error) {
	user := models.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
		Role:     input.Role,
	}
	err := user.Insert(ctx, i.db, boil.Infer())
	if err != nil {
		return models.User{}, err
	}
	return user, nil
}

func (i *impl) ExistsUserByEmail(ctx context.Context, email string) (bool, error) {
	return models.Users(models.UserWhere.Email.EQ(email)).Exists(ctx, i.db)
}

func (i *impl) SignIn(ctx context.Context, input SignInInput) (*models.User, error) {
	user, err := models.Users(qm.Where("email=?", input.Email)).One(ctx, i.db)
	if err != nil {
		return &models.User{}, err
	}
	return user, nil
}
