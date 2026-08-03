const minorWords = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "of", "on", "or", "the", "to", "with"]);

export function cleanSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function titleCase(value: string): string {
  const clean = value.trim().replace(/\s+/g, " ");

  return clean
    .split(" ")
    .map((word, index, words) => {
      if (/^[A-Z0-9]{2,8}$/.test(word)) return word;

      const lower = word.toLowerCase();
      if (index > 0 && index < words.length - 1 && minorWords.has(lower)) {
        return lower;
      }

      return lower.replace(/(^|[-/('&])([a-z])/g, (_, prefix: string, letter: string) => `${prefix}${letter.toUpperCase()}`);
    })
    .join(" ");
}

export function optionalTitle(value: string): string | null {
  const clean = value.trim();
  return clean ? titleCase(clean) : null;
}

export function cleanUploadFileName(name: string, fallback = "file"): string {
  const dot = name.lastIndexOf(".");
  const extension = dot > 0 ? name.slice(dot).toLowerCase().replace(/[^.a-z0-9]/g, "") : "";
  const base = dot > 0 ? name.slice(0, dot) : name;
  return `${cleanSlug(base) || fallback}${extension}`;
}

