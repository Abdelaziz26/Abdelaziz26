export function normalizeImages(input: unknown): string[] {
  if (Array.isArray(input)) {
    const cleaned = input.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
    return cleaned.length > 0 ? cleaned : ['/placeholder.svg'];
  }

  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return normalizeImages(parsed);
      } catch {
        return ['/placeholder.svg'];
      }
    }

    if (trimmed.includes(',')) {
      const split = trimmed.split(',').map((item) => item.trim()).filter(Boolean);
      return split.length > 0 ? split : ['/placeholder.svg'];
    }

    return trimmed ? [trimmed] : ['/placeholder.svg'];
  }

  return ['/placeholder.svg'];
}
