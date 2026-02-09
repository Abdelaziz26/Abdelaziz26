export function parseJson<T>(input: string | null | undefined, fallback: T): T {
  if (!input) {
    return fallback;
  }

  try {
    return JSON.parse(input) as T;
  } catch {
    return fallback;
  }
}

export function stringifyJson(input: unknown): string {
  return JSON.stringify(input ?? null);
}
