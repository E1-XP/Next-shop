import { router } from "./../trpc";

import { authRouter } from "./auth";
import { paymentRouter } from "./payment";
import { productRouter } from "./product";
import { reviewRouter } from "./review";

export const appRouter = router({
  auth: authRouter,
  review: reviewRouter,
  product: productRouter,
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;
