import { router } from "./../trpc";

import { authRouter } from "./auth";
import { reviewRouter } from "./review";

export const appRouter = router({ auth: authRouter, review: reviewRouter });

export type AppRouter = typeof appRouter;
