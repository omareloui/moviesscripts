export function lowerCaseToCapitalized(string: string) {
  return string.toLowerCase().replace(
    /(\b|_)(\w)/g,
    (value) => value.toUpperCase(),
  );
}
