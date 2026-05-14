export default defineEventHandler(async (event) => {
  const response = $fetch("https://oauth.battle.net/token", {
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
  event.context.blizzToken = response.then((data) => data.access_token);
});
