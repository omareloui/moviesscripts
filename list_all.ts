#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-run --unstable

import { path } from "./deps.ts";
import { MOVIE_AND_SERIES_TYPES, MOVIES_FOLDER_REGEX } from "./constants.ts";
import { getAllMoviesAndSeries, RetrieveInfo } from "./utils/mod.ts";

const moviesAndSeries = getAllMoviesAndSeries();

const grouped: {
  [
    K in
      | "movies"
      | "moviesSaga"
      | "animatedMovies"
      | "series"
      | "shortSeries"
      | "animatedSeries"
  ]: (RetrieveInfo & { fullName: string })[];
} = {
  movies: [],
  moviesSaga: [],
  animatedMovies: [],
  series: [],
  shortSeries: [],
  animatedSeries: [],
};

moviesAndSeries.forEach((seriesOrMovie) => {
  const [fullName, , type] = path.basename(seriesOrMovie.dest).match(
    MOVIES_FOLDER_REGEX,
  )! as [
    string,
    string,
    typeof MOVIE_AND_SERIES_TYPES[number],
  ];

  function add(
    type: keyof typeof grouped,
    toAdd: typeof grouped["movies"][number],
  ) {
    grouped[type].push(toAdd);
  }

  if (type === "MA") {
    return add("animatedMovies", { ...seriesOrMovie, fullName });
  }
  if (type === "MS") {
    return add("moviesSaga", { ...seriesOrMovie, fullName });
  }
  if (type === "MV") {
    return add("movies", { ...seriesOrMovie, fullName });
  }
  if (type === "SA") {
    return add("animatedSeries", { ...seriesOrMovie, fullName });
  }
  if (type === "SS") {
    return add("shortSeries", { ...seriesOrMovie, fullName });
  }
  if (type === "SE") {
    return add("series", { ...seriesOrMovie, fullName });
  }
});

Deno.writeTextFile(
  "./movies_and_series.json",
  JSON.stringify(grouped, null, 2),
);
