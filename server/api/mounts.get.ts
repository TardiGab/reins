import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session?.user) {
    return [];
  }

  const accounts = await auth.api.listUserAccounts({
    headers: event.headers,
  });
  const bnetAccount = accounts?.find(
    (acc: any) => acc.providerId === "battlenet",
  );

  if (!bnetAccount) {
    return [];
  }

  const tokenData = await auth.api.getAccessToken({
    body: {
      accountId: bnetAccount.id,
    },
    headers: event.headers,
  });

  const token = tokenData?.accessToken;
  if (!token) {
    return [];
  }

  try {
    const res = await fetch(
      "https://eu.api.blizzard.com/profile/user/wow/collections/mounts?namespace=profile-eu&locale=en_US",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    return data.mounts || [];
  } catch (error) {
    console.error("Error fetching mounts:", error);
    return [];
  }
});
