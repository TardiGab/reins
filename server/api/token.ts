export const getBlizzAccessToken = async (status: number) => {
  let blizzToken;
  if (status >= 400 && status < 500) {
    // console.log("Retrieving new access token...");
    const response = await fetch("https://oauth.battle.net/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          btoa(`${process.env.BATTLENET_ID}:${process.env.BATTLENET_SECRET}`),
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });

    blizzToken = response.json();
  }
  return blizzToken;
};
