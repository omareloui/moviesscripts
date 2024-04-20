import { path } from "./deps.ts";

export const HOME = Deno.env.get("HOME")!;
export const MOVIES_DIR = Deno.env.get("MOVIES_DIR");
export const DOWNLOADS_DIR = Deno.env.get("DOWNLOADS_DIR");

export const moviesRoot = MOVIES_DIR || path.join(HOME, "Movies");
export const downloadsRoot = DOWNLOADS_DIR || path.join(HOME, "Downloads");

export const sitcoms = [
  "How I Met Your Mother",
  "Friends",
  "The Office",
  "Brooklyn Nine Nine",
];
