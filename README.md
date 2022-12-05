# Scripts For My Movies

## Features

- **Rename** and move downloaded movies and series to match my movies system.
- Start a **random episode** from a _selected series_.
- Start a **random episode** from a _sitcom_.

---

## Usage

### From `mod.ts`

Run the `mod.ts` file

```bash
deno run --allow-read --allow-write --allow-env --unstable mod.ts [action]
```

Then provide one of an action (if it wasn't provided you'll be prompt to select one).

- `random-ep [series]` to select a random ep from the series. If `[series]` wasn't provided you'll be prompted to choose from your series.

  **eg.**

  ```bash
  deno run --allow-read --allow-write --allow-env --unstable mod.ts random-ep the office
  ```

- `random-sitcom` to select a random ep from any sitcom provided in `config.ts` file.

  **eg.**

  ```bash
  deno run --allow-read --allow-write --allow-env --unstable mod.ts random-sitcom
  ```

- `rename-downloaded` to rename all movies from the download folder and move them to the movies root dir.

  **eg.**

  ```bash
  deno run --allow-read --allow-write --allow-env --unstable mod.ts rename-downloaded
  ```

### From the specific file

#### Rename downloaded

```bash
deno run --allow-read --allow-write --allow-env --unstable rename_downloaded_movies.ts

# or

chomod +x rename_downloaded_movies.ts
./rename_downloaded_movies.ts
```

**Options:**

- `-h`, `--help` show help.
- `-V`, `--version` show the version of the script.
- `-r`, `--root` define the root folder for the movies. (Default: "/home/omareloui/Downloads").
- `-i`, `--interactive` should be interactive or not. (Default: false).
- `-m`, `--move-to-movies` should move the downloaded movie(s)/series to the movies root folder (Default: true).
- `-t`, `--test` should logout the dest only without actually moving the folders.  (Default: false.)

#### Random Episode

```bash
deno run --allow-read --allow-write --allow-env --unstable random_ep.ts

# or

chomod +x random_ep.ts
./random_ep.ts
```

**Options:**

- `-h`, `--help` show help.
- `-V`, `--version` show the version of the script.
- `[series]` the series name to start random ep from.

**eg.**

```bash
./random_ep.ts the office

# or

deno run --allow-read --allow-write --allow-env --unstable random_ep.ts how i met your
```

#### Random Episode From Sitcom

```bash
deno run --allow-read --allow-write --allow-env --unstable random_sitcom.ts

# or

chomod +x random_sitcom.ts
./random_sitcom.ts
```

---

## My naming system for the movies

### Watching Status

- `T`: to watch.
- `W`: watched.

### Movies or series types

- `MV` a movie.
- `MA` animated move.
- `MS` movies saga.
- `SE` a series.
- `SS` short series.
- `SA` animated series.

### The year(s)

First the release date for the movie or the first season year for the series. Followed with dash for series and movie sagas. Then the end year if the movie saga or series ended.

### The move/series title

Then the title of the movie/series.

### _Examples_

```txt
T MV 2022 Enola Holmes 2

T SE 2011-2019 Suits

W SE 2022- Wednesday

W SS 2022 Monster The Jeffrey Dahmer Story
```

---

## LICENSE

MIT.
