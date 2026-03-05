import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { dash } from "@better-auth/infra";
import pg from "pg";

export const auth = betterAuth({
  database: new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  baseURL: "http://localhost:3000/",
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
          getUserInfo: async (tokens) => {
            const user = await fetch("https://oauth.battle.net/userinfo", {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            }).then((res) => res.json());

            return {
              id: user.id,
              email: user.battletag, // Use battletag as email workaround
              emailVerified: false,
              name: user.battletag,
            };
          },
        },
      ],
    }),
  ],
});
