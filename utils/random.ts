export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function radomFromArray<T>(array: T[]) {
  return array[random(0, array.length - 1)];
}
