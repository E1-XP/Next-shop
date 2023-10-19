import { router } from "./../trpc";

import { authRouter } from "./auth";
import { productRouter } from "./product";
import { reviewRouter } from "./review";

export const appRouter = router({
  auth: authRouter,
  review: reviewRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
