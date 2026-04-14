import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
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

  if (session?.user) {
    const realmsResponse = fetch(
      "https://us.api.blizzard.com/data/wow/realm/index?namespace=dynamic-us&locale=en_US",
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
        const realms = data.realms;
        return realms;
        // return mounts;
      })
      .catch((error) => {
        console.error("Error fetching US realms index:", error);
      });

    return realmsResponse;
  }
});
