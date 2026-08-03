# 143 Studios Website And CMS

Official Next.js website and Supabase-powered CMS for 143 Studios (SMC-Private) Limited.

## Local Setup

1. Install Node.js 20 or newer.
2. Run `npm ci`.
3. Copy the required environment variables into `.env.local`.
4. Apply SQL files from `supabase/migrations` to the connected Supabase project.
5. Run `npm run dev`.

## Verification

Run these commands before deployment:

```bash
npm run lint
npm run build
```

## Deployment

The production website is deployed on Vercel at `https://143studios.online`. Configure the same environment variables in the Vercel project and never commit `.env.local` or `node_modules` to Git.

## Main Systems

- Public Artists And Releases Catalog
- Dynamic Artist And Release SEO
- Admin Artists And Releases CMS
- Editable Homepage, About, Services, Contact And Global Settings
- Guru Assistant Settings And Public Widget
- Cloudinary Image Uploads
- Cloudflare R2 Audio Uploads
- Resend Contact Inquiries
