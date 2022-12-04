#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run --unstable

import { colors, Command } from "./deps.ts";

import {
  getEps,
  getSeries,
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

  console.log(`\nStarting ${colors.blue(randomEp.name)}.\n`);
  await startVideo(randomEp.path);
}

if (import.meta.main) {
  const { args } = await initCommand();
  main(args.join(" "));
}
