#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-run

import { path } from "./deps.ts";
import { MOVIE_AND_SERIES_TYPES, MOVIES_FOLDER_REGEX } from "./constants.ts";
import { getAllMoviesAndSeries, RetrieveInfo } from "./utils/mod.ts";

const moviesAndSeries = getAllMoviesAndSeries();

const grouped: {
  [K in
    | "movies"
    | "moviesSagas"
    | "animatedMovies"
    | "series"
    | "shortSeries"
    | "animatedSeries"]: (RetrieveInfo & { fullName: string })[];
} = {
  movies: [],
  moviesSagas: [],
  animatedMovies: [],
  series: [],
  shortSeries: [],
  animatedSeries: [],
};

moviesAndSeries.forEach((seriesOrMovie) => {
  const [fullName, , type] = path
    .basename(seriesOrMovie.dest)
    .match(MOVIES_FOLDER_REGEX)! as [
    string,
    string,
    (typeof MOVIE_AND_SERIES_TYPES)[number],
  ];

  function add(
    type: keyof typeof grouped,
    toAdd: (typeof grouped)["movies"][number],
  ) {
    grouped[type].push(toAdd);
  }

  switch (type) {
    case "MA":
      return add("animatedMovies", { ...seriesOrMovie, fullName });
    case "MS":
      return add("moviesSagas", { ...seriesOrMovie, fullName });
    case "MV":
      return add("movies", { ...seriesOrMovie, fullName });
    case "SA":
      return add("animatedSeries", { ...seriesOrMovie, fullName });
    case "SS":
      return add("shortSeries", { ...seriesOrMovie, fullName });
    case "SE":
      return add("series", { ...seriesOrMovie, fullName });

    default:
      break;
  }
});

const jsonContent = JSON.stringify(grouped, null, 2);
const filename = "./movies_and_series.json";

Deno.writeTextFile(filename, jsonContent);

console.log(`${jsonContent}

The list are saved in ${filename}, in where you ran the script.`);
