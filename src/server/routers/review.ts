import { z } from "zod";

import { procedure, router } from "./../trpc";
import prisma from "@/../prisma/client";

import { reviewSchema } from "@/app/[locale]/product/[id]/validation";

export const reviewRouter = router({
  get: procedure
    .input(z.object({ productId: z.string().nonempty() }))
    .query(async (opts) => {
      const { productId } = opts.input;

      const products = await prisma.review.findMany({
        where: { productId },
      });

      return products;
    }),
  create: procedure
    .input(
      reviewSchema.extend({
        rating: z.number().gte(1),
        userId: z.string(),
        productId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { review, username, rating, userId, productId } = opts.input;

      const created = await prisma.review.create({
        data: {
          text: review,
          rating,
          authorName: username,
          userId,
          productId,
        },
      });

      return created;
    }),
});

export type reviewRouter = typeof reviewRouter;
