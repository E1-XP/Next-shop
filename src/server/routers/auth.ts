import { z } from "zod";
import { procedure, router } from "./../trpc";

export const authRouter = router({
  hello: procedure
    // .input(
    //   z.object({
    //     text: z.string(),
    //   })
    // )
    .query(async (opts) => {
      return {
        greeting: `hello auth`,
      };
    }),
});

export type AuthRouter = typeof authRouter;
