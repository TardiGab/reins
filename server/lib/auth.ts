import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { dash } from "@better-auth/infra";
import pg from "pg";

export const auth = betterAuth({
  appName: "Reins",
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  plugins: [
    dash(),
    genericOAuth({
      config: [
        {
          providerId: "battlenet",
          clientId: process.env.BATTLENET_ID!,
          clientSecret: process.env.BATTLENET_SECRET!,
          discoveryUrl:
            "https://oauth.battle.net/.well-known/openid-configuration",
          scopes: ["openid", "wow.profile"],
          // Désactive la vérification stricte du nonce pour Battle.net OIDC
          disableIdTokenNonceBinding: true,
          // Définit explicitement comment extraire l'identifiant unique
          accountSubject: (ctx) => String(ctx.profile.id ?? ctx.profile.sub),
          getUserInfo: async (tokens) => {
            const res = await fetch("https://oauth.battle.net/userinfo", {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            });

            if (!res.ok) {
              const err = await res.text();
              console.error("Battle.net /userinfo error:", res.status, err);
              return null;
            }

            const user = await res.json();
            const userId = String(user.id ?? user.sub);
            const battleTag = user.battletag ?? userId;

            return {
              id: userId,
              sub: userId, // Requis par Better Auth en mode OIDC
              name: battleTag,
              // Battle.net ne fournissant pas d'email, on génère un email synthétique valide
              email: `${userId}@users.battle.net`,
              emailVerified: true,
              ...user,
            };
          },
        },
      ],
    }),
  ],
});
