import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      schema: z.object({
        date: z.string().optional(),
        patch: z.string().optional(),
      }),
    }),
  },
});
