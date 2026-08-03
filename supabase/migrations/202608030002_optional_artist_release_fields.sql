-- Keep only identity, code, name/title, slug, relation and status fields required.
-- All descriptive, media, metadata and platform fields may be left blank in Admin.

alter table public.artists
  alter column artist_type drop not null,
  alter column genre drop not null,
  alter column city drop not null,
  alter column country drop not null,
  alter column bio drop not null,
  alter column image drop not null,
  alter column banner drop not null,
  alter column spotify drop not null,
  alter column apple_music drop not null,
  alter column youtube drop not null,
  alter column youtube_music drop not null,
  alter column instagram drop not null,
  alter column facebook drop not null,
  alter column tiktok drop not null,
  alter column website drop not null,
  alter column real_name drop not null;

alter table public.releases
  alter column release_type drop not null,
  alter column version drop not null,
  alter column genre drop not null,
  alter column language drop not null,
  alter column release_date drop not null,
  alter column cover drop not null,
  alter column audio_url drop not null,
  alter column duration drop not null,
  alter column upc drop not null,
  alter column isrc drop not null,
  alter column label drop not null,
  alter column copyright_c drop not null,
  alter column copyright_p drop not null,
  alter column description drop not null,
  alter column lyrics drop not null,
  alter column credits drop not null,
  alter column spotify drop not null,
  alter column apple_music drop not null,
  alter column youtube drop not null,
  alter column youtube_music drop not null,
  alter column song_type drop not null,
  alter column content_advisory drop not null,
  alter column subgenre drop not null;

alter table public.artists
  alter column verified set default false,
  alter column featured set default false,
  alter column sort_order set default 0;

alter table public.releases
  alter column featured set default false,
  alter column sort_order set default 0;
