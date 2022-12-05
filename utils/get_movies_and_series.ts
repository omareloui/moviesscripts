import { path, WalkEntry, walkSync } from "../deps.ts";
import { moviesRoot } from "../config.ts";

import { MOVIES_FOLDER_REGEX, VIDEO_EXT } from "../constants.ts";

export interface RetrieveInfo {
  dest: string;
  name: string;
}

export function parseRetrieveInfo(folderEntry: Deno.DirEntry): RetrieveInfo {
  return {
    dest: path.join(moviesRoot, folderEntry.name),
    name: folderEntry.name.match(MOVIES_FOLDER_REGEX)![5],
  };
}

export function getAllMoviesAndSeries(): RetrieveInfo[] {
  return [...Deno.readDirSync(moviesRoot)].filter((x) =>
    x.name.match(MOVIES_FOLDER_REGEX)
  ).map(parseRetrieveInfo);
}

export function getSeries(): RetrieveInfo[] {
  return [...(Deno.readDirSync(moviesRoot))].filter((x) =>
    x.name.match(/^[WT] S[ESA]/)
  ).map(parseRetrieveInfo);
}

export function getEps(selectedRetrieveInfo: RetrieveInfo): WalkEntry[] {
  return [...walkSync(selectedRetrieveInfo.dest)].filter((x) =>
    x.isFile && VIDEO_EXT.some((y) => x.name.toLowerCase().endsWith(y))
  );
}
