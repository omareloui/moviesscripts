package core_test

import (
	"testing"

	"github.com/omareloui/moviesscripts/internal/core"
	"github.com/stretchr/testify/assert"
)

func TestParser(t *testing.T) {
	parser := core.NewParser()

	t.Run("shows", func(t *testing.T) {
		ep1 := "Ted.Lasso.S03E02.720p.ATVP.WEBRip.x264-GalaxyTV.mkv"
		ep2 := "Chainsaw Man S01E01 2022 1080p WEBRip Dual Audio AAC H.265-Hodl.mkv"
		ep3 := "Chainsaw Man S01E02 2022 1080p WEBRip Dual Audio AAC H.265-Hodl.mkv"
		ep4 := "Chainsaw Man S01E11 2022 1080p WEBRip Dual Audio AAC H.265-Hodl.mkv"
		ep5 := "friends.s09e23e24.720p.bluray.x264-mrs.sujaidr.mkv"

		eps := []string{ep1, ep2, ep3, ep4}

		t.Run("parse type", func(t *testing.T) {
			for _, ep := range eps {
				entry := parser.Parse(ep)
				assert.Equal(t, core.KindShow, entry.Kind)
			}
		})

		t.Run("parse title", func(t *testing.T) {
			en := parser.Parse(ep1)
			assert.Equal(t, "Ted Lasso", en.Title)
			en = parser.Parse(ep2)
			assert.Equal(t, "Chainsaw Man", en.Title)
			en = parser.Parse(ep3)
			assert.Equal(t, "Chainsaw Man", en.Title)
			en = parser.Parse(ep4)
			assert.Equal(t, "Chainsaw Man", en.Title)
			en = parser.Parse(ep5)
			assert.Equal(t, "Friends", en.Title)
		})

		t.Run("parse season", func(t *testing.T) {
			en := parser.Parse(ep1)
			assert.Equal(t, uint8(3), en.Season)
			en = parser.Parse(ep2)
			assert.Equal(t, uint8(1), en.Season)
			en = parser.Parse(ep3)
			assert.Equal(t, uint8(1), en.Season)
			en = parser.Parse(ep4)
			assert.Equal(t, uint8(1), en.Season)
			en = parser.Parse(ep5)
			assert.Equal(t, uint8(9), en.Season)
		})

		t.Run("parse episode", func(t *testing.T) {
			en := parser.Parse(ep1)
			assert.Equal(t, uint16(2), en.EPs[0])
			en = parser.Parse(ep2)
			assert.Equal(t, uint16(1), en.EPs[0])
			en = parser.Parse(ep3)
			assert.Equal(t, uint16(2), en.EPs[0])
			en = parser.Parse(ep4)
			assert.Equal(t, uint16(11), en.EPs[0])
			en = parser.Parse(ep5)
			assert.Equal(t, uint16(23), en.EPs[0])
			assert.Equal(t, uint16(24), en.EPs[1])
		})

		t.Run("parse resolution", func(t *testing.T) {
			en := parser.Parse(ep1)
			assert.Equal(t, core.Resolution720, en.Resolution)
			en = parser.Parse(ep2)
			assert.Equal(t, core.Resolution1080, en.Resolution)
			en = parser.Parse(ep3)
			assert.Equal(t, core.Resolution1080, en.Resolution)
			en = parser.Parse(ep4)
			assert.Equal(t, core.Resolution1080, en.Resolution)
			en = parser.Parse(ep5)
			assert.Equal(t, core.Resolution720, en.Resolution)
		})

		t.Run("parse extension", func(t *testing.T) {
			for _, ep := range eps {
				en := parser.Parse(ep)
				assert.Equal(t, "mkv", en.Ext)
			}
		})
	})

	t.Run("movies", func(t *testing.T) {
		movie1 := "Mad.Max.Fury.Road.2015.1080p.BluRay.x264.YIFY.mp4"
		movie2 := "The.Usual.Suspects.1995.1080p.BluRay.x264-[YTS.AM].mp4"
		movie3 := "About.Time.2013.720p.BluRay.x264.YIFY.mp4"
		movie4 := "The.Intern.2015.720p.BluRay.x264-[YTS.AG].mp4"
		movie5 := "Palm.Springs.2020.1080p.HULU.WEBRip.1400MB.DD5.1.x264-GalaxyRG.mkv"
		movie6 := "Rosaline.2022.1080p.WEBRip.x264.AAC5.1-[YTS.MX].mp4"
		movie7 := "Mad Max Fury Road (2015) [imdbid-tt1392190].mp4"

		movies := []string{movie1, movie2, movie3, movie4, movie5, movie6, movie7}

		t.Run("parse type", func(t *testing.T) {
			for _, mov := range movies {
				en := parser.Parse(mov)
				assert.Equal(t, core.KindMovie, en.Kind)
			}
		})

		t.Run("parse title", func(t *testing.T) {
			en := parser.Parse(movie1)
			assert.Equal(t, "Mad Max Fury Road", en.Title)
			en = parser.Parse(movie2)
			assert.Equal(t, "The Usual Suspects", en.Title)
			en = parser.Parse(movie3)
			assert.Equal(t, "About Time", en.Title)
			en = parser.Parse(movie4)
			assert.Equal(t, "The Intern", en.Title)
			en = parser.Parse(movie5)
			assert.Equal(t, "Palm Springs", en.Title)
			en = parser.Parse(movie6)
			assert.Equal(t, "Rosaline", en.Title)
			en = parser.Parse(movie7)
			assert.Equal(t, "Mad Max Fury Road", en.Title)
		})

		t.Run("parse year", func(t *testing.T) {
			en := parser.Parse(movie1)
			assert.Equal(t, uint16(2015), en.ReleaseDate)
			en = parser.Parse(movie2)
			assert.Equal(t, uint16(1995), en.ReleaseDate)
			en = parser.Parse(movie3)
			assert.Equal(t, uint16(2013), en.ReleaseDate)
			en = parser.Parse(movie4)
			assert.Equal(t, uint16(2015), en.ReleaseDate)
			en = parser.Parse(movie5)
			assert.Equal(t, uint16(2020), en.ReleaseDate)
			en = parser.Parse(movie6)
			assert.Equal(t, uint16(2022), en.ReleaseDate)
			en = parser.Parse(movie7)
			assert.Equal(t, uint16(2015), en.ReleaseDate)
		})

		t.Run("parse resolution", func(t *testing.T) {
			en := parser.Parse(movie1)
			assert.Equal(t, core.Resolution1080, en.Resolution)
			en = parser.Parse(movie2)
			assert.Equal(t, core.Resolution1080, en.Resolution)
			en = parser.Parse(movie3)
			assert.Equal(t, core.Resolution720, en.Resolution)
			en = parser.Parse(movie4)
			assert.Equal(t, core.Resolution720, en.Resolution)
			en = parser.Parse(movie5)
			assert.Equal(t, core.Resolution1080, en.Resolution)
			en = parser.Parse(movie6)
			assert.Equal(t, core.Resolution1080, en.Resolution)
		})

		t.Run("parse imdb", func(t *testing.T) {
			movie := "Mad Max Fury Road (2015) [imdbid-tt1392190].mp4"
			en := parser.Parse(movie)
			assert.Equal(t, "tt1392190", en.IMDBID)
		})

		t.Run("parse extension", func(t *testing.T) {
			en := parser.Parse(movie1)
			assert.Equal(t, "mp4", en.Ext)
			en = parser.Parse(movie2)
			assert.Equal(t, "mp4", en.Ext)
			en = parser.Parse(movie3)
			assert.Equal(t, "mp4", en.Ext)
			en = parser.Parse(movie4)
			assert.Equal(t, "mp4", en.Ext)
			en = parser.Parse(movie5)
			assert.Equal(t, "mkv", en.Ext)
			en = parser.Parse(movie6)
			assert.Equal(t, "mp4", en.Ext)
			en = parser.Parse(movie7)
			assert.Equal(t, "mp4", en.Ext)
		})
	})
}
