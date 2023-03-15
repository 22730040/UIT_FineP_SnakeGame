package main

import (
	"github.com/UIT-22730036/snake-api-golang/cmd/server/routes"
	"github.com/UIT-22730036/snake-api-golang/pkg/db"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	dbUrl := os.Getenv("DB_URL")
	database := db.Connect(dbUrl)

	r := routes.InitRoute(database)

	if err := http.ListenAndServe(":5000", r); err != nil {
		log.Fatal(err)
	}
}
