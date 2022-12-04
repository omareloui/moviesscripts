#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run --unstable

import { Command, EnumType, Select } from "./deps.ts";
import { main as renameDownloadMovies } from "./rename_downloaded_movies.ts";
import { main as randomEp } from "./random_ep.ts";
import { downloadsRoot } from "./config.ts";

enum Action {
  RandomEp = "random-ep",
  RenameDownloaded = "rename-downloaded",
}

const actions = new EnumType(Action);

function initCommand() {
  return new Command()
    .name("movies-scripts")
    .description("Movies system helper.")
    .version("1.0.0")
    .type("actions", actions)
    .arguments("[action:actions] [other...:string]")
    .parse(Deno.args);
}

async function main(args: [Action?, ...string[]]) {
  let [action, ...otherArgs] = args;

  if (!action) {
    action = await Select.prompt({
      message: "What to do?",
      options: [Action.RandomEp, Action.RenameDownloaded],
    }) as Action;
  }

  if (action === Action.RandomEp) {
    return randomEp(otherArgs.join(" "));
  }
  if (action === Action.RenameDownloaded) {
    return renameDownloadMovies({
      interactive: false,
      moveToMovies: true,
      root: downloadsRoot,
      test: false,
    });
  }
}

if (import.meta.main) {
  const { args } = await initCommand();
  await main(args);
}
