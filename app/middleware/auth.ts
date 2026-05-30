import { authClient } from "~~/server/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch);
  if (!session.value?.session) {
    return navigateTo({ path: "/", query: { redirect: to.fullPath } });
  }
});
