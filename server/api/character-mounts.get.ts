export default defineEventHandler(async (event) => {
  interface Query {
    region: string;
    realm: string;
    character: string;
    accessToken: string;
  }

  const query: Query = getQuery(event);

  const mountsResponse = fetch(
    `https://${query.region.toLocaleLowerCase()}.api.blizzard.com/profile/wow/character/${query.realm}/${query.character.toLocaleLowerCase()}/collections/mounts?namespace=profile-${query.region.toLocaleLowerCase()}&locale=en_US`,
    {
      headers: {
        Authorization: `Bearer ${query.accessToken}`,
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
