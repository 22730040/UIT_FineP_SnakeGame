package routes

import (
	"database/sql"
	"github.com/UIT-22730036/snake-api-golang/internal/controller/users_controller"
	"github.com/UIT-22730036/snake-api-golang/internal/handler"
	"github.com/UIT-22730036/snake-api-golang/internal/repository"
	"github.com/UIT-22730036/snake-api-golang/pkg/jwt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
	"os"
)

func InitRoute(db *sql.DB) *chi.Mux {
	r := chi.NewRouter()

	repo := repository.NewRepo(db)
	userCtrl := users_controller.New(repo)
	h := handler.NewHandler(userCtrl)
	secretKey := os.Getenv("SECRET_KEY")
	tokenAuth := jwt.GetTokenAuth(secretKey)
	r.Use(jwtauth.Verifier(tokenAuth))
	r.Use(jwtauth.Authenticator)
	r.Route("/", func(r chi.Router) {
		r.Route("/users", userRouter(h))
		r.Route("/scores", scoreRouter(h))
	})

	return r
}

func userRouter(h handler.Handler) func(chi.Router) {
	return func(r chi.Router) {
		r.Get("/get", h.GetUsers)
		r.Post("/create", h.CreateUser)
		r.Post("/sign-in", h.SignIn)
	}
}

func scoreRouter(h handler.Handler) func(chi.Router) {
	return func(r chi.Router) {
		r.Get("/get", h.GetScores)
	}
}
