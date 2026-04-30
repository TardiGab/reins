const KEY = "token";

export default defineEventHandler(async (event) => {
  interface Query {
    region: string;
    realm: string;
    character: string;
    accessToken: string;
  }

  interface AccessToken {
    access_token: string;
    expires_in: number;
  }

  const query: Query = getQuery(event);

  const storage = useStorage("assets:server");

  const token = await storage.getItem<AccessToken>(KEY);

  const mountsResponse = fetch(
    `https://${query.region.toLocaleLowerCase()}.api.blizzard.com/profile/wow/character/${query.realm}/${query.character.toLocaleLowerCase()}/collections/mounts?namespace=profile-${query.region.toLocaleLowerCase()}&locale=en_US`,
    {
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
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
