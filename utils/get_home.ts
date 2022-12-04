export function getHome() {
  return Deno.env.get("HOME")!;
}
