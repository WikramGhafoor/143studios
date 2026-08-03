# 143 Studios Final Source Release

Final source package prepared on 2026-08-04.

## Included

- Schema-aligned admin and public artist/release fields.
- Working Add/Edit audio, profile, banner, artwork, logo, favicon, PNG icon, and social-image uploads.
- Expanded dropdown choices with an Other/manual-entry option where applicable.
- Automatic clean artist and release slugs.
- Hyphenated, URL-safe audio and image filenames.
- Title Case normalization for entered content.
- Optional fields that can be omitted safely and remain hidden publicly when empty.
- Dynamic public pages, canonical metadata, sitemap, structured data, redirects, and security improvements.

## Verification

- `npm run lint` passed.
- `npm run build` passed with all admin, public, upload, and settings routes.

## Live Release Steps

1. Apply `supabase/migrations/202608030001_create_site_pages.sql` only if the `site_pages` table is not already present.
2. Apply `supabase/migrations/202608030002_optional_artist_release_fields.sql`.
3. Deploy this source package using the production environment configuration.
4. Test one image upload and one audio upload against the production Cloudinary/R2 accounts.

This package finalizes the source code. It does not itself deploy or modify the live website.
