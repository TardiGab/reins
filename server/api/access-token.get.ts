export default defineEventHandler(async () => {
  const getAccessToken = fetch(`https://oauth.battle.net/token`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        btoa(`${process.env.BATTLENET_ID}:${process.env.BATTLENET_SECRET}`),
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const userAccessToken = data;
      return userAccessToken;
    })
    .catch((error) => {
      console.error("Error retrieving access token:", error);
    });
  return getAccessToken;
});
