import { SEASON_EP_REGEX } from "../constants.ts";

export function parseSeasonAndEp(
  fileName: string,
  options: { shouldThrowError: boolean } = { shouldThrowError: false },
) {
  const match = fileName.match(SEASON_EP_REGEX);
  if (!match) {
    if (options.shouldThrowError) {
      throw new Error(
        "Can't extract the season and episode from the file name.",
      );
    } else return ({});
  }

  const [, season, ep] = match;

  const seasonNumber = parseInt(season.slice(1), 10);
  const epNumber = parseInt(ep.slice(1), 10);

  return {
    seasonNumber,
    epNumber,
    text: `Season ${seasonNumber.toString().padStart(2, "0l")}, Episode ${
      epNumber.toString().padStart(2, "0")
    }.`,
  };
}
