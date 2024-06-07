package core

type LibraryEntry struct {
	Title       string
	Kind        Kind
	ReleaseDate uint16
	Season      uint8
	EP          uint16
	IMDBID      string
	Resolution  Resolution
	Ext         string
}
