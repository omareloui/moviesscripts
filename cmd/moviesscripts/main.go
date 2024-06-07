package main

import (
	"flag"
	"log"
	"os"
	"path"
	"path/filepath"

	"github.com/joho/godotenv"
	"github.com/omareloui/moviesscripts/internal/core"
)

var pa string

func main() {
	flag.StringVar(&pa, "path", ".", "Path to populate")
	flag.Parse()

	if !path.IsAbs(pa) {
		wd, _ := os.Getwd()
		pa = filepath.Join(wd, pa)
	}

	_ = godotenv.Load()

	libpath := os.Getenv("LIB_PATH")

	if libpath == "" {
		log.Panicln("the library path wasn't provided")
	}

	parser := core.NewParser()
	resolver := core.NewPathResolver()

	populator := core.NewPopulator(libpath, parser, resolver)
	populator.Populate(pa)
}
