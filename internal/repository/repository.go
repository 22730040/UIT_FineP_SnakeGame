package repository

import (
	"database/sql"
	"github.com/UIT-22730036/snake-api-golang/internal/repository/scores_repo"
	"github.com/UIT-22730036/snake-api-golang/internal/repository/users_repo"
)

type IRepo interface {
	User() users_repo.IUser
	Score() scores_repo.IScore
}

type impl struct {
	db    *sql.DB
	user  users_repo.IUser
	score scores_repo.IScore
}

func NewRepo(db *sql.DB) IRepo {
	return &impl{
		db:    db,
		user:  users_repo.New(db),
		score: scores_repo.New(db),
	}
}

func (i *impl) User() users_repo.IUser {
	return i.user
}

func (i *impl) Score() scores_repo.IScore {
	return i.score
}
