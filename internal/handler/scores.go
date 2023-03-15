package handler

import (
	"fmt"
	"github.com/go-chi/jwtauth/v5"
	"net/http"
)

func (h *Handler) GetScores(w http.ResponseWriter, r *http.Request) {
	_, claims, _ := jwtauth.FromContext(r.Context())
	fmt.Println(claims["id"])
	w.Write([]byte("Scores"))
}
