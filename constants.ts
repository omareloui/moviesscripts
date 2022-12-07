export const MOVIES_TYPES = [
  "MV", // Movie
  "MS", // Movie saga
  "MA", // Animation movie
] as const;

export const SERIES_TYPES = [
  "SE", // Series
  "SS", // Short Series
  "SA", // Animation series
] as const;

export const MOVIE_AND_SERIES_TYPES = [
  ...MOVIES_TYPES,
  ...SERIES_TYPES,
] as const;

export const WATCHING_STATES = [
  "T", // To watch
  "W", // Watched
] as const;

export const VIDEO_EXT = [
  "mp4",
  "m4p",
  "avi",
  "mkv",
  "webm",
  "flv",
  "vob",
  "ogv",
  "ogg",
  "mov",
  "wmv",
  "viv",
  "m4v",
];

export const MOVIES_FOLDER_REGEX =
  /^(T|W) (M[VSA]|S[ESA]) ((?:19|20)\d{2})-?((?:19|20)\d{2})? (.+)$/;

export const YEAR_REGEX = /\b(20|19)\d{2}\b/;
export const SEASON_EP_REGEX = /(?:\b|_)(s\d{2})(e\d{2})(?:\b|_)/i;
export const SEASON_REGEX =
  /(?:\b|_)(?:season|s)(?: |\.|_|-)?(\d{1,2})(?:\b|_)/i;
export const NO_EP_REGEX = /^(?!.+(?:\b|_)(ep|episode)\d{1,2}(?:\b|_))/i;
