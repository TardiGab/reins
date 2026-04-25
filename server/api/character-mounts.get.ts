import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
  interface Query {
    region: string;
    realm: string;
    character: string;
  }

  const query: Query = getQuery(event);

  const tokenData = await auth.api.getAccessToken({
    body: {
      providerId: "battlenet",
    },
    headers: event.headers,
  });

  const token = tokenData?.accessToken;

  // async function getCharMounts() {
  //   const url = `https://${query.region.toLocaleLowerCase()}.api.blizzard.com/profile/wow/character/${query.realm}/${query.character.toLocaleLowerCase()}/collections/mounts?namespace=profile-${query.region.toLocaleLowerCase()}&locale=en_US`;
  //   try {
  //     const response = await fetch(url, {
  //       headers: {
  //         Authorization: `Bearer ${getAccessToken.access_token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       getBlizzAccessToken();
  //     }
  //   } catch (error) {
  //     console.error("Error getting character mounts:", error);
  //   }
  // }

  // getCharMounts();

  const mountsResponse = fetch(
    `https://${query.region.toLocaleLowerCase()}.api.blizzard.com/profile/wow/character/${query.realm}/${query.character.toLocaleLowerCase()}/collections/mounts?namespace=profile-${query.region.toLocaleLowerCase()}&locale=en_US`,
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
      const mounts = data.mounts;
      return mounts;
    })
    .catch((error) => {
      console.error("Error fetching user mounts:", error);
    });
  return mountsResponse;
});
