import { Confirm, Number, prompt, Select } from "../deps.ts";
import { MOVIES_TYPES, SERIES_TYPES } from "../constants.ts";

import type { RetrieveInfo } from "./get_movies_and_series.ts";

import type { MovieAndSeriesType } from "../types/mod.ts";

export function askForType(isSeries = false): Promise<MovieAndSeriesType> {
  return Select.prompt({
    message: isSeries ? "Series type?" : "Movie type?",
    options: isSeries ? [...SERIES_TYPES] : [...MOVIES_TYPES],
    default: isSeries ? "SE" : "MV",
  }) as Promise<MovieAndSeriesType>;
}

export async function askForYear(askForEndYear = true) {
  const answers = await prompt([
    {
      name: "startYear",
      message: "Enter the year it aired",
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 1,
      after: async (_, next) => {
        if (!askForEndYear) return;
        await next();
      },
    },
    {
      name: "hasEnded",
      message: "Do you know when it ended?",
      type: Confirm,
      default: false,
      after: async ({ hasEnded }, next) => {
        if (!hasEnded) return;
        await next();
      },
    },
    {
      name: "endYear",
      message: "Enter the year it ended",
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 10,
      default: undefined,
    },
  ]);
  const { startYear, endYear } = answers;
  return {
    ...answers,
    years: `${startYear}${!endYear || startYear !== endYear ? "-" : ""}${
      (endYear && startYear !== endYear) ? endYear : ""
    }`,
  };
}

export async function selectMovieOrSeries(
  moviesAndSeries: RetrieveInfo[],
  input?: string,
): Promise<RetrieveInfo> {
  const selectedMovieOrSeries: string = input ||
    await Select.prompt({
      options: moviesAndSeries.map((x) => x.name),
      message: "Select the series to choose from",
    });

  const selectedInfo = moviesAndSeries.find((x) =>
    x.name.toLowerCase().match(selectedMovieOrSeries.toLowerCase())
  );

  if (!selectedInfo) {
    throw new Error("Can't find the provided series.");
  }
  return selectedInfo;
}
