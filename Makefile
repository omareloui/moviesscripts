all: run

run:
	@go run ./cmd/moviesscripts/...

build:
	@go build -o ./bin/moviesscripts ./cmd/moviesscripts/...

start:
	@./bin/moviesscripts
