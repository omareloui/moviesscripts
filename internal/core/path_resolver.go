package core

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
)

type IPathResolver interface {
	ResolveRelativeDir(*LibraryEntry) string
	ResolveFileName(*LibraryEntry) string
	ResolvePath(*LibraryEntry) string
}

type PathResolver struct{}

func NewPathResolver() *PathResolver {
	return &PathResolver{}
}

func (r *PathResolver) ResolveRelativeDir(en *LibraryEntry) string {
	builder := new(strings.Builder)

	switch en.Kind {
	case KindMovie:
		fmt.Fprintf(builder, "movies%c", os.PathSeparator)
	case KindShow:
		fmt.Fprintf(builder, "shows%c", os.PathSeparator)
	default:
		log.Panicln("invalid kind on resolving filename")
	}

	builder.WriteString(en.Title)

	if en.ReleaseDate != 0 {
		fmt.Fprintf(builder, " (%d)", en.ReleaseDate)
	}

	if en.IMDBID != "" {
		fmt.Fprintf(builder, " [imdbid-%s]", en.IMDBID)
	}

	switch en.Kind {
	case KindMovie:
	case KindShow:
		if en.Season == 0 || en.EP == 0 {
			log.Panicln("invalid season or ep number")
		}

		fmt.Fprintf(builder, "%cSeason %02d", os.PathSeparator, en.Season)

	default:
		log.Panicln("invalid kind on resolving filename")
	}

	return builder.String()
}

func (r *PathResolver) ResolveFileName(en *LibraryEntry) string {
	builder := new(strings.Builder)
	builder.WriteString(en.Title)

	switch en.Kind {
	case KindMovie:
		if en.ReleaseDate == 0 {
			log.Panicln("no release date where it's required. title:", en.Title)
		}

		fmt.Fprintf(builder, " (%d)", en.ReleaseDate)

		if en.IMDBID != "" {
			fmt.Fprintf(builder, " [imdbid-%s]", en.IMDBID)
		}

		if en.Resolution != 0 {
			fmt.Fprintf(builder, " - %sp", en.Resolution)
		}

	case KindShow:
		if en.Season == 0 || en.EP == 0 {
			log.Panicln("invalid season or ep number")
		}

		fmt.Fprintf(builder, " S%02d", en.Season)
		fmt.Fprintf(builder, "E%02d", en.EP)

	default:
		log.Panicln("invalid kind on resolving filename")
	}

	fmt.Fprintf(builder, ".%s", en.Ext)

	return builder.String()
}

func (r *PathResolver) ResolvePath(en *LibraryEntry) string {
	dir := r.ResolveRelativeDir(en)
	filename := r.ResolveFileName(en)
	return filepath.Join(dir, filename)
}
