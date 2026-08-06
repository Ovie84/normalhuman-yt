import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const mailRouter = createTRPCRouter({
  // Placeholder query to get your compiler passing
  getHello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
