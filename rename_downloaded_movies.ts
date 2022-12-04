#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --unstable

import { colors, Command } from "./deps.ts";

import { moveFolderRecursively, parseDownloadFolderInfo } from "./utils/mod.ts";

import { downloadsRoot } from "./config.ts";

function initCommand() {
  return new Command()
    .name("rename_movies")
    .description(
      "A cli tool to rename series and movies folders to my personal system.",
    )
    .version("1.0.0")
    .option(
      "-r, --root [root:file]",
      "The root folder for the movies.",
      { default: downloadsRoot },
    )
    .option(
      "-i, --interactive [interactive:boolean]",
      "Should be interactive or not.",
      { default: false },
    )
    .option(
      "-m, --move-to-movies [move-to-movies:boolean]",
      "Should move to the root of the movies folder or not.",
      { default: false },
    )
    .option(
      "-t, --test [interactive:boolean]",
      "Should logout the dist only without actually moving the folders.",
      { default: false },
    )
    .parse(Deno.args);
}

async function main({
  interactive: isInteractive,
  moveToMovies: shouldMoveToMoviesRoot,
  test: isTest,
  root,
}: {
  interactive: boolean;
  moveToMovies: boolean;
  test: boolean;
  root: string | true | undefined;
}) {
  const rootDir = typeof root === "string" ? root : downloadsRoot;

  for await (
    const dirOrFile of Deno.readDir(rootDir)
  ) {
    if (!dirOrFile.isDirectory) continue;

    const parsedInfo = await parseDownloadFolderInfo(dirOrFile.name, {
      isInteractive,
      isTest,
      shouldMoveToMoviesRoot,
      root: rootDir,
    });

    if (!parsedInfo) continue;

    const { src, dist } = parsedInfo;

    if (isTest) {
      console.log(
        `Would move ${colors.blue.underline.bold(src)} to ${
          colors.brightGreen.underline.bold(dist)
        }`,
      );
      continue;
    }

    await moveFolderRecursively(src, dist);
  }
}

if (import.meta.main) {
  const { options } = await initCommand();
  main(options);
}
