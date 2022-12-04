export async function startVideo(dest: string) {
  const process = Deno.run({
    cmd: ["vlc", dest],
    stdout: "null",
  });
  await process.status();
}
