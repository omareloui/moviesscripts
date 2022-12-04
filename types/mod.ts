import { MOVIE_AND_SERIES_TYPES, WATCHING_STATES } from "../constants.ts";

export type MovieAndSeriesType = typeof MOVIE_AND_SERIES_TYPES[number];
export type WatchingState = typeof WATCHING_STATES[number];
