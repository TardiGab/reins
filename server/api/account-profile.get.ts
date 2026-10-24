import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
  interface Query {
    region: string;
  }

  const session = await auth.api.getSession({
    headers: event.headers,
  });

  const tokenData = await auth.api.getAccessToken({
    body: {
      providerId: "battlenet",
    },
    headers: event.headers,
  });

  const token = tokenData?.accessToken;
  const query: Query = getQuery(event);
  const region = query.region;

  const response = fetch(
    `https://${region}.api.blizzard.com/profile/user/wow?namespace=profile-${region}&locale=en_US`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const account = data.wow_accounts;
      return account[0].characters;
    })
    .catch((error) => {
      console.error("Error fetching WoW account data:", error);
    });

  return response;
});
