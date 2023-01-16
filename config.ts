import { path } from "./deps.ts";

export const HOME = Deno.env.get("HOME")!;

export const moviesRoot = path.join(HOME, "Movies");
export const downloadsRoot = path.join(HOME, "Downloads");

export const sitcoms = [
  "How I Met Your Mother",
  "Friends",
  "The Office",
  "Brooklyn Nine Nine",
];
