#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run

import { colors, WalkEntry } from "./deps.ts";
import { sitcoms } from "./config.ts";
import {
  getEps,
  getSeries,
  notify,
  parseSeasonAndEp,
  randomFromArray,
  selectMovieOrSeries,
  startVideo,
} from "./utils/mod.ts";

export async function main() {
  const series = getSeries();

  const sitcomsInfo = await Promise.all(
    sitcoms.map((s) => selectMovieOrSeries(series, s)),
  );

  const eps = sitcomsInfo.reduce((acc, val) => {
    const eps = getEps(val);
    return [...acc, ...eps];
  }, [] as WalkEntry[]);

  const randomEp = randomFromArray(eps);

  console.log(randomEp);
  await notify(
    `Starting ${randomEp.name}`,
    parseSeasonAndEp(randomEp.name).text,
  );
  console.log(`\nStarting ${colors.blue(randomEp.name)}.\n`);

  await startVideo(randomEp.path);
}

if (import.meta.main) {
  main();
}
