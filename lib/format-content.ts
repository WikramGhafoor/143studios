export function formatPublicText(value: string): string {
  return value
    .replace(/\bRevailed\b/gi, "Revealed")
    .replace(/\bHiphop\b/gi, "Hip-Hop");
}

