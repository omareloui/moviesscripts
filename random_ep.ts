#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run

import { colors, Command } from "./deps.ts";

import {
  getEps,
  getSeries,
  lowerCaseToCapitalized,
  notify,
  parseSeasonAndEp,
  randomFromArray,
  selectMovieOrSeries,
  startVideo,
} from "./utils/mod.ts";

function initCommand() {
  return new Command()
    .name("random_ep")
    .description("Open a random ep from a selected series.")
    .version("1.0.0")
    .arguments("[series...:string]")
    .parse(Deno.args);
}

export async function main(seriesName?: string) {
  const selectedRetrieveInfo = await selectMovieOrSeries(
    getSeries(),
    seriesName,
  );

  const eps = getEps(selectedRetrieveInfo);
  const randomEp = randomFromArray(eps);

  await notify(
    `Starting ${lowerCaseToCapitalized(selectedRetrieveInfo.name)}`,
    parseSeasonAndEp(randomEp.name).text,
  );
  console.log(`\nStarting ${colors.blue(randomEp.name)}.\n`);
  await startVideo(randomEp.path);
}

if (import.meta.main) {
  const { args } = await initCommand();
  main(args.join(" "));
}
