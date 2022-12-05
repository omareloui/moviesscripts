import { colors, path } from "../deps.ts";
import { getErrorMessage } from "./error.ts";

export async function moveFile(src: string, dest: string): Promise<void> {
  try {
    await Deno.rename(src, dest);
  } catch (e) {
    const message = getErrorMessage(e);
    console.error(
      colors.red.bold.white(`Problem moving ${src} to ${dest}.`),
    );
    console.error(colors.red.white(`Error message: ${message}`));
  }
}

export async function moveFolderRecursively(src: string, dest: string) {
  await Deno.mkdir(dest, { recursive: true });

  try {
    for await (const f of Deno.readDir(src)) {
      const filename = f.name;
      await Deno.rename(
        path.join(src, filename),
        path.join(dest, filename),
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
