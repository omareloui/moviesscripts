export function notify(title: string, description?: string) {
  const p = Deno.run({ cmd: ["notify-send", title, description || ""] });
  return p.status();
}
