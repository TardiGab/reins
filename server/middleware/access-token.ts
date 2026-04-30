const KEY = "token";

export default defineEventHandler(async () => {
  interface AccessToken {
    access_token: string;
    expires_in: number;
  }

  const storage = useStorage("assets:server");

  const token = await storage.getItem<AccessToken>(KEY);

  if (!token) {
    const getAccessToken = $fetch<AccessToken>(
      `https://oauth.battle.net/token`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            btoa(`${process.env.BATTLENET_ID}:${process.env.BATTLENET_SECRET}`),
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
      },
    );

    const accessToken: AccessToken = {
      access_token: (await getAccessToken).access_token,
      expires_in: (await getAccessToken).expires_in,
    };

    await storage.setItem<AccessToken>(KEY, accessToken, {
      ttl: accessToken.expires_in - 60,
    });
  }
});
