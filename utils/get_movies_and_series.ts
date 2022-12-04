import { path, walkSync } from "../deps.ts";
import { moviesRoot } from "../config.ts";

import { MOVIES_FOLDER_REGEX, VIDEO_EXT } from "../constants.ts";

export interface RetrieveInfo {
  dist: string;
  name: string;
}

export function getSeries(): RetrieveInfo[] {
  return [...(Deno.readDirSync(moviesRoot))].filter((x) =>
    x.name.match(/^[WT] S[ESA]/)
  ).map((x) => ({
    dist: path.join(moviesRoot, x.name),
    name: x.name.match(MOVIES_FOLDER_REGEX)![5],
  }));
}

export function getEps(selectedRetrieveInfo: RetrieveInfo) {
  return [...walkSync(selectedRetrieveInfo.dist)].filter((x) =>
    x.isFile && VIDEO_EXT.some((y) => x.name.toLowerCase().endsWith(y))
  );
}
