export interface BaseError {
  name: string;
  message: string;
}

export function getErrorMessage(e: unknown): string {
  const isObject = e && typeof e === "object";

  if (isObject && "name" in e && "message" in e) {
    return (e as BaseError).message;
  }

  return `Can't get the error message. ERROR: ${e}`;
}
