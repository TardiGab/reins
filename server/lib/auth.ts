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
          // getToken: async () => {
          //   const response = await fetch(
          //     `https://oauth.battle.net/token?client_id=${process.env.BATTLENET_ID}&client_secret=${process.env.BATTLENET_SECRET}&grant_type=credentials`,
          //     { method: "POST" },
          //   );

          //   const data = await response.json();

          //   return {
          //     accessToken: data.access_token,
          //     refreshToken: data.refresh_token,
          //     expiresIn: data.expires_in,
          //   };
          // },
          getUserInfo: async (tokens) => {
            const user = await fetch("https://oauth.battle.net/userinfo", {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            }).then((res) => res.json());

            // const accessToken = tokens.raw?.access_token;

            return {
              id: user.id,
              email: user.battletag, // Use battletag as email workaround
              emailVerified: false,
              name: user.battletag,
              // accessToken: accessToken,
            };
          },
        },
      ],
    }),
  ],
});
