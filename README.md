![Logo](https://gabriel-manciu.be/assets/images/case/reins/user-collection.webp)

# Reins

A World of Warcraft mount collecting tracker. Check what are the mounts you're missing and pin them to create your farming route.

Not sure what to farm next? Get a random mount suggestion based on the mounts you currently do not own. 

You have a writing spirit? Mounts have their own page and you can contribute by writing a guide on how to obtain it!

## Features

- Login to your Battle.net account with OAuth2.0
- Search for a character to see their mount collection
- Pin mounts
- Get random mount suggestion
- Compare your mounts collections with other WoW players
- Get guides on how to obtain mounts

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) (Vue 3, TypeScript)
- **Content & CMS:** [@nuxt/content](https://content.nuxt.com/) (v3) & [Nuxt Studio](https://nuxt.studio/)
- **Styling & Design:** SCSS / Sass
- **Authentication:** [Better Auth](https://www.better-auth.com/) (Battle.net OAuth 2.0 / OpenID Connect)
- **Database:** PostgreSQL ([Neon](https://neon.tech/) Serverless / `pg`)
- **External APIs:** [Blizzard Battle.net API](https://develop.battle.net/) (World of Warcraft Profile & Game Data APIs)
- **Analytics & Hosting:** [Vercel](https://vercel.com/) & [@vercel/analytics](https://vercel.com/analytics)

## Have an idea for a new feature? Want to report a bug? 

Please open an issue on the [GitHub repository's issues page](https://github.com/TardiGab/reins/issues) and I will take a look at it as soon as possible.

## Contribution

If you wish to run this project locally or contribute, you'll need to set up the environment variables. Copy the `.env.example` file to `.env` and fill in the required values.

### Environment Variables Guide

- **`BETTER_AUTH_SECRET`**: A random string used to secure the authentication sessions.
- **`BETTER_AUTH_URL`**: The base URL of your application (e.g., `http://localhost:3000`).
- **`BETTER_AUTH_API_KEY`**: An API key used for Better Auth integration.
- **`DATABASE_URL`**: The primary connection string for the PostgreSQL database (typically a Neon DB pooled connection).
- **`BATTLENET_ID`**: Your Battle.net OAuth client ID to enable WoW login.
- **`BATTLENET_SECRET`**: Your Battle.net OAuth client secret.
- **`STUDIO_AUTH_GITHUB_CLIENT_ID` / `NUXT_STUDIO_AUTH_GITHUB_CLIENT_ID`**: GitHub OAuth client ID used for Nuxt Studio integration.
- **`STUDIO_AUTH_GITHUB_CLIENT_SECRET` / `NUXT_STUDIO_AUTH_GITHUB_CLIENT_SECRET`**: GitHub OAuth client secret used for Nuxt Studio integration.

*(Other database variables such as `PGHOST`, `PGUSER`, or `POSTGRES_URL` are alternative connection parameters usually provided by Neon or Vercel Postgres.)*