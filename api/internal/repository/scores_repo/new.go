package scores_repo

import (
	"context"
	"database/sql"
	"github.com/UIT-22730036/snake-api-golang/internal/models"
	"github.com/volatiletech/sqlboiler/v4/types"
)

type AddScoreInput struct {
	Score  types.Decimal
	UserId string
}

type IScore interface {
	AddScore(ctx context.Context, input AddScoreInput) (models.Score, error)
}

type impl struct {
	db *sql.DB
}

func New(db *sql.DB) IScore {
	return &impl{db: db}
}
