package core

import (
	"log"
	"strconv"
	"strings"
)

type IParser interface {
	Parse(string) *LibraryEntry
}

type Parser struct{}

func NewParser() *Parser {
	return &Parser{}
}

func (p *Parser) Parse(filename string) *LibraryEntry {
	ext := VidExtRe.FindStringSubmatch(filename)
	if len(ext) == 0 {
		ext = KeepExtRe.FindStringSubmatch(filename)
	}
	if len(ext) == 0 {
		log.Panicln("invalid file extension")
	}

	libEntry := LibraryEntry{}

	libEntry.Ext = ext[1]

	yearMatch := YearRe.FindStringSubmatch(filename)
	reMatch := ResolutionRe.FindStringSubmatch(filename)

	epMatch := EpRe.FindStringSubmatch(filename)
	movMatch := MovieRe.FindStringSubmatch(filename)
	imdbMatch := IMDBRe.FindStringSubmatch(filename)

	isEp := len(epMatch) > 0
	isMovie := len(movMatch) > 0

	if isEp {
		libEntry.Kind = KindShow

		title := epMatch[1]
		if title == "" {
			log.Panicln("err parsing the title")
		}
		libEntry.Title = p.conformTitle(title)

		s, err := strconv.ParseUint(epMatch[2], 10, 8)
		if err != nil {
			log.Panicln("err parsing the season after it matched")
		}
		libEntry.Season = uint8(s)
		ep, err := strconv.ParseUint(epMatch[3], 10, 16)
		if err != nil {
			log.Panicln("err parsing the episode after it matched")
		}
		libEntry.EPs = []uint16{uint16(ep)}
		if epMatch[4] != "" {
			ep, err = strconv.ParseUint(epMatch[4], 10, 16)
			if err != nil {
				log.Panicln("err parsing the episode after it matched")
			}
			libEntry.EPs = append(libEntry.EPs, uint16(ep))
		}
	} else if isMovie {
		libEntry.Kind = KindMovie

		title := movMatch[1]
		if title == "" {
			log.Panicln("err parsing the title")
		}
		libEntry.Title = p.conformTitle(title)
	} else {
		log.Panicln("can't parse the kind. file:", filename)
	}

	if len(yearMatch) > 0 {
		r, err := strconv.ParseUint(yearMatch[1], 10, 16)
		if err != nil {
			log.Panicln("err parsing the release date after it matched")
		}
		libEntry.ReleaseDate = uint16(r)
	}

	if len(reMatch) > 0 {
		switch reMatch[1] {
		case Resolution720.String():
			libEntry.Resolution = Resolution720
		case Resolution1080.String():
			libEntry.Resolution = Resolution1080
		default:
			log.Panicln("err parsing the resolution after it matched")
		}
	}

	if len(imdbMatch) > 0 {
		libEntry.IMDBID = imdbMatch[1]
	}

	return &libEntry
}

func (p *Parser) conformTitle(t string) string {
	t = strings.Trim(ToReplaceRe.ReplaceAllString(t, " "), " ")
	t = BoundariesRe.ReplaceAllStringFunc(t, func(s string) string {
		return strings.ToUpper(s)
	})
	return t
}
