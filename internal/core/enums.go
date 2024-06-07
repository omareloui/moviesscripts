package core

type Kind int

const (
	KindMovie Kind = iota + 1
	KindShow
)

func (k Kind) String() string {
	return [...]string{
		"Movie", "Show",
	}[k-1]
}

type Resolution int

const (
	Resolution720 Resolution = iota + 1
	Resolution1080
)

func (r Resolution) String() string {
	return [...]string{
		"720", "1080",
	}[r-1]
}

type FileKind int

const (
	FileKindVideo FileKind = iota + 1
	FileKindKeep
	FileKindIgnore
)

func (k FileKind) String() string {
	return [...]string{
		"Video", "Keep", "Ignore",
	}[k-1]
}
