package scores_controller

import "github.com/UIT-22730036/snake-api-golang/internal/repository"

type ScoreCtrl interface {
}

type impl struct {
	repo repository.IRepo
}

func New(repo repository.IRepo) ScoreCtrl {
	return &impl{
		repo: repo,
	}
}
