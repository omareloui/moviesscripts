#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --unstable

import { path } from "./deps.ts";
import { getSeries, moveFile, selectMovieOrSeries } from "./utils/mod.ts";
import { SEASON_REGEX } from "./constants.ts";

async function main() {
  const series = getSeries();
  const requiredSeriesFolder = await selectMovieOrSeries(series);
  const seasonsFolders = [
    ...Deno.readDirSync(requiredSeriesFolder.dest),
  ].filter((x) => x.isDirectory);

  for (const season of seasonsFolders) {
    const seasonMatch = season.name.match(SEASON_REGEX);

    if (!seasonMatch) {
      throw new Error(`"${season.name}" is not a season folder.`);
    }
    const seasonNumber = seasonMatch[1];

    await moveFile(
      path.join(requiredSeriesFolder.dest, season.name),
      path.join(requiredSeriesFolder.dest, seasonNumber.padStart(2, "0")),
    );
  }
}

if (import.meta.main) await main();
