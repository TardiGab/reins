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
      "https://gateway.battlenet.com.cn/data/wow/realm/index?namespace=dynamic-cn&locale=en_US",
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
      })
      .catch((error) => {
        console.error("Error fetching CN realms index:", error);
      });

    return realmsResponse;
  }
});
