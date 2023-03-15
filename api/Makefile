run:
	@go run ./cmd/server/main.go

db:
	@docker compose up -d db

migrate:
	@docker compose up -d db-migrate

boiler:
	@sqlboiler psql

vendor:
	@go mod tidy && go mod vendor
