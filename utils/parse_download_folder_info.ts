import { path } from "../deps.ts";

import { colors } from "../deps.ts";
import { askForType, askForYear } from "./ask.ts";
import {
  MOVIES_FOLDER_REGEX,
  NO_EP_REGEX,
  SEASON_EP_REGEX,
  SEASON_REGEX,
  YEAR_REGEX,
} from "../constants.ts";
import { moviesRoot } from "../config.ts";

import type { WatchingState } from "../types/mod.ts";

export interface MoveInfo {
  src: string;
  finalFolderName: string;
  dist: string;
}

interface OptionalInfoForParse {
  isInteractive?: boolean;
  watchingState?: WatchingState;
}

async function parseMovie(
  folderName: string,
  yearMatch: RegExpMatchArray,
  { isInteractive = false, watchingState = "T" }: OptionalInfoForParse = {},
) {
  const selectedType = isInteractive ? await askForType() : "MV";
  const year = yearMatch[0];
  const title = folderName.slice(0, yearMatch.index).replace(/\./g, " ")
    .replace(
      /(\(|\[)$/,
      "",
    )
    .trim();

  return `${watchingState} ${selectedType} ${year} ${title}`;
}

async function parseEp(
  folderName: string,
  yearMatch: RegExpMatchArray | null,
  seasonAndEpMatch: RegExpMatchArray,
  { isInteractive = false, watchingState = "T" }: OptionalInfoForParse,
) {
  const selectedType = isInteractive ? await askForType(true) : "SE";
  const series = seasonAndEpMatch[1];

  const title = folderName
    .slice(0, yearMatch?.index || seasonAndEpMatch.index)
    .replace(/\./g, " ")
    .replace(/(\(|\[)$/, "")
    .trim();

  const { years } = await askForYear();

  return path.join(
    `${watchingState} ${selectedType} ${years} ${title}`,
    `${series.toUpperCase()}`,
  );
}

async function parseSeason(
  folderName: string,
  yearMatch: RegExpMatchArray | null,
  seasonMatch: RegExpMatchArray,
  { isInteractive = false, watchingState = "T" }: OptionalInfoForParse,
) {
  const seasonNumber = parseInt(seasonMatch[1], 10);
  const selectedType = isInteractive ? await askForType(true) : "SE";

  const title = folderName
    .slice(0, yearMatch?.index || seasonMatch.index)
    .replace(/\./g, " ")
    .replace(/(\(|\[)$/, "")
    .trim();

  const { years } = await askForYear();

  return path.join(
    `${watchingState} ${selectedType} ${years} ${title}`,
    `S${seasonNumber.toString().padStart(2, "0")}`,
  );
}

export async function parseDownloadFolderInfo(
  downloadFolderName: string,
  {
    shouldMoveToMoviesRoot = false,
    root = downloadFolderName,
    isInteractive = false,
    isTest = false,
  } = {},
): Promise<MoveInfo | undefined> {
  const distDir = shouldMoveToMoviesRoot ? moviesRoot : root;

  if (shouldMoveToMoviesRoot && downloadFolderName.match(MOVIES_FOLDER_REGEX)) {
    return {
      src: path.join(root, downloadFolderName),
      finalFolderName: downloadFolderName,
      dist: path.join(moviesRoot, downloadFolderName),
    };
  }

  const dir = downloadFolderName;

  const yearMatch = dir.match(YEAR_REGEX);
  const seasonAndEpMatch = dir.match(SEASON_EP_REGEX);
  const noEpMatch = dir.match(NO_EP_REGEX);
  const seasonMatch = dir.match(SEASON_REGEX);

  const watchingState: WatchingState = "T";

  const isEp = !!seasonAndEpMatch;
  const isSeason = !!noEpMatch && !!seasonMatch;
  const isMovie = !!yearMatch && !seasonAndEpMatch && !seasonMatch;

  let final: string | undefined;

  if ((isMovie || isEp || isSeason) && !isTest) {
    console.log(
      colors.blue.bold(`\n Working on ${colors.bold.underline.blue(dir)}.`),
    );
  }

  const parseOptions: OptionalInfoForParse = {
    isInteractive,
    watchingState,
  };
  // If it's a movie
  if (isMovie) {
    final = await parseMovie(dir, yearMatch, parseOptions);
  } // If it's an ep in a season of a series
  else if (isEp) {
    final = await parseEp(dir, yearMatch, seasonAndEpMatch, parseOptions);
  } // If it's a full season
  else if (isSeason) {
    final = await parseSeason(dir, yearMatch, seasonMatch, parseOptions);
  }

  if (final) {
    return {
      src: path.join(root, dir),
      finalFolderName: final,
      dist: path.join(distDir, final),
    };
  }
}
