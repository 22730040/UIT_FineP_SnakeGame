package db

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
)

func Connect(DB_URL string) *sql.DB {
	db, err := sql.Open("postgres", DB_URL)
	if err != nil {
		log.Fatal(err)
	}
	return db
}
