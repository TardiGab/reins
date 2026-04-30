const KEY = "token";

export default defineEventHandler(async (event) => {
  interface AccessToken {
    access_token: string;
    expires_in: number;
  }

  const storage = useStorage("assets:server");

  const token = await storage.getItem<AccessToken>(KEY);

  const realmsResponse = fetch(
    "https://tw.api.blizzard.com/data/wow/realm/index?namespace=dynamic-tw&locale=en_US",
    {
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
    },
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const realms = data.realms;
      return realms;
    })
    .catch((error) => {
      console.error("Error fetching TW realms index:", error);
    });

  return realmsResponse;
});
