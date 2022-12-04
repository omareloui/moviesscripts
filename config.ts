import { path } from "./deps.ts";

import { getHome } from "./utils/mod.ts";

export const HOME = getHome();

export const moviesRoot = path.join(HOME, "Movies and Series");
export const downloadsRoot = path.join(HOME, "Downloads");

export const sitcoms = [
  "How I Met Your Mother",
  "Friends",
  "The Office",
];
