package core

import (
	"io/fs"
	"log"
	"os"
	"path/filepath"
)

type FileInfo struct {
	Path string
	Info fs.FileInfo
	Kind FileKind
	Dest string
}

type Populator struct {
	libpath      string
	pathResolver IPathResolver
	parser       IParser
}

func NewPopulator(libpath string, parser IParser, pathResolver IPathResolver) *Populator {
	return &Populator{libpath: libpath, parser: parser, pathResolver: pathResolver}
}

func (p *Populator) getInfo(path string) []FileInfo {
	dest := []FileInfo{}

	err := filepath.Walk(path, func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			log.Panicln("err walking the dir", err)
		}

		if info.IsDir() || RemoveExtRe.MatchString(info.Name()) {
			return nil
		}

		vidMatch := VidExtRe.MatchString(info.Name())
		keepMatch := KeepExtRe.MatchString(info.Name())

		if vidMatch {
			dest = append(dest, FileInfo{Path: path, Info: info, Kind: FileKindVideo})
		}
		if keepMatch {
			dest = append(dest, FileInfo{Path: path, Info: info, Kind: FileKindKeep})
		}

		if vidMatch || keepMatch {
			en := p.parser.Parse(info.Name())
			d := filepath.Join(p.libpath, p.pathResolver.ResolvePath(en))

			dest[len(dest)-1].Dest = d
		}

		return nil
	})
	if err != nil {
		log.Panicln("err walking the dir", err)
	}

	return dest
}

func (p *Populator) Populate(path string) {
	pathInfo := p.getInfo(path)
	for _, info := range pathInfo {
		err := os.MkdirAll(filepath.Dir(info.Dest), os.ModePerm)
		if err != nil {
			log.Panicln("error creating the directories. failed on creating:", filepath.Dir(info.Dest))
		}
		err = os.Rename(info.Path, info.Dest)
		if err != nil {
			log.Panicln("error moving the file to the new directory. failed on:", filepath.Dir(info.Dest))
		}
	}

	err := p.removeEmptyDirs(path)
	if err != nil {
		log.Panicln("error removing empty directories. failed on:", filepath.Dir(path))
	}
}

func (p *Populator) removeEmptyDirs(path string) error {
	dirs, err := os.ReadDir(path)
	if err != nil {
		return err
	}

	for _, info := range dirs {
		if !info.IsDir() {
			shouldRemove := RemoveExtRe.MatchString(info.Name())
			if shouldRemove {
				err = os.RemoveAll(filepath.Join(path, info.Name()))
				if err != nil {
					return err
				}
			}
			continue
		}

		childrenDirs, err := os.ReadDir(filepath.Join(path, info.Name()))
		if err != nil {
			return err
		}

		if len(childrenDirs) == 0 {
			err = os.RemoveAll(filepath.Join(path, info.Name()))
			if err != nil {
				return err
			}
			continue
		}

		err = p.removeEmptyDirs(filepath.Join(path, info.Name()))
		if err != nil {
			return err
		}
	}

	childrenDirs, err := os.ReadDir(path)
	if err != nil {
		return err
	}

	if len(childrenDirs) == 0 {
		err = os.RemoveAll(path)
		if err != nil {
			return err
		}
	}

	return nil
}
