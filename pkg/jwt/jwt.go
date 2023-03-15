package jwt

import (
	"github.com/go-chi/jwtauth/v5"
)

type InputJwt struct {
	ID        string
	Email     string
	Role      string
	SecretKey string
}

func GetTokenAuth(secretKey string) *jwtauth.JWTAuth {
	tokenAuth := jwtauth.New("HS256", []byte(secretKey), nil)
	return tokenAuth
}

func GenerateToken(input InputJwt) string {
	tokenAuth := GetTokenAuth(input.SecretKey)
	claim := map[string]interface{}{
		"id":    input.ID,
		"email": input.Email,
		"role":  input.Role,
	}
	_, token, _ := tokenAuth.Encode(claim)
	return token
}
