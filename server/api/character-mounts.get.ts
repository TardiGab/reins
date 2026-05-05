import { getBlizzAccessToken } from "./token";

export default defineEventHandler(async (event) => {
  interface Query {
    region: string;
    realm: string;
    character: string;
    accessToken: string;
  }

  let getBlizzToken;
  let accessToken = await event.context.blizzToken;

  const query: Query = getQuery(event);

  const url = `https://${query.region.toLocaleLowerCase()}.api.blizzard.com/profile/wow/character/${query.realm}/${query.character.toLocaleLowerCase()}/collections/mounts?namespace=profile-${query.region.toLocaleLowerCase()}&locale=en_US`;

  const mountsResponse = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        getBlizzToken = await getBlizzAccessToken(res.status);
        accessToken = getBlizzToken.access_token;
        handleFailure(accessToken);
      }
      return res.json();
    })
    .then((data) => {
      const mounts = data.mounts;
      return mounts;
    })
    .catch((error) => {
      console.error("Error fetching user mounts:", error);
    });

  async function handleFailure(accessToken: string) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await response.json();
  }
  return mountsResponse;
});
