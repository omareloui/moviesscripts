package core

type LibraryEntry struct {
	Title       string
	Kind        Kind
	ReleaseDate uint16
	Season      uint8
	EPs         []uint16
	IMDBID      string
	Resolution  Resolution
	Ext         string
}
