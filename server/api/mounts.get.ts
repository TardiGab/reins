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
  // console.log("Token:", token);

  if (session) {
    const mountsResponse = fetch(
      "https://eu.api.blizzard.com/profile/user/wow/collections/mounts?namespace=profile-eu&locale=fr_FR",
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
        // console.log("Raw API Response:", data.mounts);
        // const mounts = data.mounts.map((mount: any) => ({
        //   id: mount.mount.id,
        //   name: mount.mount.name,
        // }));
        // console.log("Processed Mounts:", mounts);
        const mounts = data.mounts;
        return mounts;
      })
      .catch((error) => {
        console.error("Error fetching mounts:", error);
      });

    return mountsResponse;
  }
});
