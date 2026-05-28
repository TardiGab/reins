import { getBlizzAccessToken } from "./token";

export default defineEventHandler(async (event) => {
  interface Query {
    region: string;
    mountId: number;
  }

  let getBlizzToken;
  let accessToken = await event.context.blizzToken;

  const query: Query = getQuery(event);

  const url = `https://eu.api.blizzard.com/data/wow/mount/${query.mountId}?namespace=static-eu&locale=en_US`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        getBlizzToken = await getBlizzAccessToken(res.status);
        accessToken = getBlizzToken.access_token;
        return await handleFailure(accessToken);
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching mount infos:", error);
    });

  async function handleFailure(accessToken: string) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await response.json();
  }
  return response;
});
