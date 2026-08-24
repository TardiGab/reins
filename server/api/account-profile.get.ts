import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session?.user) {
    return null;
  }

  const accounts = await auth.api.listUserAccounts({
    headers: event.headers,
  });
  const bnetAccount = accounts?.find(
    (acc: any) => acc.providerId === "battlenet",
  );

  if (!bnetAccount) {
    return null;
  }

  const tokenData = await auth.api.getAccessToken({
    body: {
      accountId: bnetAccount.id,
    },
    headers: event.headers,
  });

  const token = tokenData?.accessToken;
  if (!token) {
    return null;
  }

  try {
    const res = await fetch(
      "https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=en_US",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    const account = data.wow_accounts;
    return account?.[0]?.characters || [];
  } catch (error) {
    console.error("Error fetching WoW account data:", error);
    return null;
  }
});
