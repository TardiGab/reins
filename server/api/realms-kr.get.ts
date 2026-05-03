import { getBlizzAccessToken } from "./token";

export default defineEventHandler(async (event) => {
  const url =
    "https://kr.api.blizzard.com/data/wow/realm/index?namespace=dynamic-kr&locale=en_US";
  let getBlizzToken;
  let accessToken = await event.context.blizzToken;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("EU:", response.status);
    if (!response.ok) {
      getBlizzToken = await getBlizzAccessToken(response.status);
      accessToken = getBlizzToken.access_token;
      handleFailure(accessToken);
    }
    return response;
  } catch (error) {
    console.error("Error fetching EU realms index:", error);
  }

  async function handleFailure(accessToken: string) {
    const response = await $fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  }
});
