import { mergeRouters } from "./../trpc";

import { authRouter } from "./auth";

export const appRouter = mergeRouters(authRouter);

export type AppRouter = typeof appRouter;
