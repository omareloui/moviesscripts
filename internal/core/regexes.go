package core

import (
	"fmt"
	"regexp"
	"strings"
)

var (
	sep    = `(?:\b|\s|_)`
	number = `\d{1,3}`
)

var (
	YearRe       *regexp.Regexp = regexp.MustCompile(fmt.Sprintf(`%s((?:20|19)\d{2})%s`, sep, sep))
	ResolutionRe *regexp.Regexp = regexp.MustCompile(fmt.Sprintf(`%s(720|1080)p%s`, sep, sep))
	IMDBRe       *regexp.Regexp = regexp.MustCompile(fmt.Sprintf(`%simdb(?:id)?-(.+?)%s`, sep, sep))

	ToReplaceRe *regexp.Regexp = regexp.MustCompile(`[(._\-]`)

	EpRe    *regexp.Regexp = regexp.MustCompile(fmt.Sprintf(`^(.+)%s[Ss](%s)[Ee](%s)%s`, sep, number, number, sep))
	MovieRe *regexp.Regexp = regexp.MustCompile(fmt.Sprintf(`^(.+)%s((?:20|19)\d{2})%s`, sep, sep))

	VidExtRe    *regexp.Regexp = regexp.MustCompile(fmt.Sprintf(`\.(%s)$`, strings.Join(ExtensionsVideos[:], "|")))
	KeepExtRe   *regexp.Regexp = regexp.MustCompile(fmt.Sprintf(`\.(%s)$`, strings.Join(ExtensionsKeep[:], "|")))
	RemoveExtRe *regexp.Regexp = regexp.MustCompile(fmt.Sprintf(`\.(%s)$`, strings.Join(ExtensionsRemove[:], "|")))
)
