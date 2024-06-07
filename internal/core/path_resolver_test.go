package core_test

import (
	"testing"

	"github.com/omareloui/moviesscripts/internal/core"
	"github.com/stretchr/testify/assert"
)

func TestPathResolver(t *testing.T) {
	resolver := core.NewPathResolver()

	t.Run("filename", func(t *testing.T) {
		t.Run("movies", func(t *testing.T) {
			en := core.LibraryEntry{
				Title:       "Luca",
				Ext:         "mp4",
				Kind:        core.KindMovie,
				ReleaseDate: 2019,
				Resolution:  core.Resolution720,
			}

			t.Run("without imdb", func(t *testing.T) {
				en1 := en
				p := resolver.ResolveFileName(&en1)
				assert.Equal(t, "Luca (2019) - 720p.mp4", p)
			})

			t.Run("with imdb", func(t *testing.T) {
				en1 := en
				en1.IMDBID = "tt12801262"
				p := resolver.ResolveFileName(&en1)
				assert.Equal(t, "Luca (2019) [imdbid-tt12801262] - 720p.mp4", p)
			})

			t.Run("panics without release date", func(t *testing.T) {
				en1 := en
				en1.ReleaseDate = 0
				assert.Panics(t, func() { _ = resolver.ResolveFileName(&en1) })
			})
		})

		t.Run("shows", func(t *testing.T) {
			en := core.LibraryEntry{
				Title:       "Better Call Saul",
				Ext:         "mkv",
				Kind:        core.KindShow,
				ReleaseDate: 2015,
				Resolution:  core.Resolution1080,
				Season:      2,
				EPs:         []uint16{10},
				IMDBID:      "tt3032476",
			}

			t.Run("with everything", func(t *testing.T) {
				en1 := en
				p := resolver.ResolveFileName(&en1)
				assert.Equal(t, "Better Call Saul S02E10.mkv", p)
			})

			t.Run("with two eps", func(t *testing.T) {
				en1 := en
				en1.EPs = []uint16{10, 11}
				p := resolver.ResolveFileName(&en1)
				assert.Equal(t, "Better Call Saul S02E10-E11.mkv", p)
			})

			t.Run("panics without season", func(t *testing.T) {
				en1 := en
				en1.Season = 0
				assert.Panics(t, func() {
					resolver.ResolveFileName(&en1)
				})
			})

			t.Run("panics without episode", func(t *testing.T) {
				en1 := en
				en1.EPs[0] = 0
				assert.Panics(t, func() {
					resolver.ResolveFileName(&en1)
				})
			})
		})
	})

	t.Run("relative dir", func(t *testing.T) {
		t.Run("movies", func(t *testing.T) {
			en := core.LibraryEntry{
				Title:       "Luca",
				Ext:         "mp4",
				Kind:        core.KindMovie,
				ReleaseDate: 2019,
				Resolution:  core.Resolution720,
				IMDBID:      "tt12801262",
			}

			t.Run("with imdb", func(t *testing.T) {
				d := resolver.ResolveRelativeDir(&en)
				assert.Equal(t, "movies/Luca (2019) [imdbid-tt12801262]", d)
			})
		})

		t.Run("shows", func(t *testing.T) {
			en := core.LibraryEntry{
				Title:       "Better Call Saul",
				Ext:         "mkv",
				Kind:        core.KindShow,
				ReleaseDate: 2015,
				Resolution:  core.Resolution1080,
				Season:      2,
				EPs:         []uint16{10},
				IMDBID:      "tt3032476",
			}

			t.Run("with everything", func(t *testing.T) {
				d := resolver.ResolveRelativeDir(&en)
				assert.Equal(t, "shows/Better Call Saul (2015) [imdbid-tt3032476]/Season 02", d)
			})
		})
	})
}
