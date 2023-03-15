package scores_repo

import (
	"context"
	"fmt"
	"github.com/UIT-22730036/snake-api-golang/internal/models"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

func (i *impl) AddScore(ctx context.Context, input AddScoreInput) (models.Score, error) {
	score := models.Score{
		Score:  input.Score,
		Userid: input.UserId,
	}
	err := score.Insert(ctx, i.db, boil.Infer())
	if err != nil {
		return models.Score{}, err
	}
	user, err := models.Users(qm.Where("id=?", input.UserId)).One(ctx, i.db)
	if err != nil {
		return models.Score{}, err
	}
	err = user.AddUseridScores(ctx, i.db, true, &score)
	if err != nil {
		return models.Score{}, err
	}
	fmt.Println(user)
	return score, err
}
