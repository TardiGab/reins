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
  console.log("Token:", token);

  if (session) {
    const mountsResponse = await fetch(
      "https://eu.api.blizzard.com/profile/user/wow/collections/mounts?namespace=profile-eu&locale=fr_FR",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json());

    console.log("Mounts Response:", mountsResponse);

    return {
      mounts: mountsResponse,
    };
  }
});
