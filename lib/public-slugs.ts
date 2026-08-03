const artistAliases: Record<string, string> = {
  r_k: "rk",
};

const releaseAliases: Record<string, string> = {
  r_k: "taqila",
};

export function publicArtistSlug(slug: string): string {
  return artistAliases[slug] || slug;
}

export function publicReleaseSlug(slug: string): string {
  return releaseAliases[slug] || slug;
}

