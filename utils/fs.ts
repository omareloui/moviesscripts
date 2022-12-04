import { colors, path } from "../deps.ts";
import { getErrorMessage } from "./error.ts";

export async function moveFile(src: string, dist: string): Promise<void> {
  try {
    await Deno.rename(src, dist);
  } catch (e) {
    const message = getErrorMessage(e);
    console.error(
      colors.red.bold.white(`Problem moving ${src} to ${dist}.`),
    );
    console.error(colors.red.white(`Error message: ${message}`));
  }
}

export async function moveFolderRecursively(src: string, dist: string) {
  await Deno.mkdir(dist, { recursive: true });

  try {
    for await (const f of Deno.readDir(src)) {
      const filename = f.name;
      await Deno.rename(
        path.join(src, filename),
        path.join(dist, filename),
      );
    }
    console.log("Moving:", src);
    await Deno.remove(src);
  } catch (e) {
    const message = getErrorMessage(e);
    console.error(
      colors.underline.bold.bgRed.brightBlack(
        `Wasn't able to move ${src}.`,
      ),
    );
    console.error(`Error message: ${colors.red(message)}`);
  }
}
