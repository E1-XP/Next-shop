import { z } from "zod";

import { procedure, router } from "./../trpc";
import prisma from "@/../prisma/client";

export const productRouter = router({
  getOne: procedure
    .input(z.object({ id: z.string().nonempty() }))
    .query(async (opts) => {
      const { id } = opts.input;

      const product = await prisma.product.findUnique({
        where: { id },
      });

      return product;
    }),
  getAll: procedure
    .input(
      z.object({
        query: z.string().nonempty().optional(),
        order: z
          .string()
          .regex(/(?:asc|desc)/i)
          .optional(),
      })
    )
    .query(async (opts) => {
      const { order, query } = opts.input;

      const products = await prisma.product.findMany({
        where: query
          ? {
              OR: [
                {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  brand: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : undefined,
        orderBy: { id: order === "asc" ? "asc" : "desc" },
      });

      return products;
    }),
  getModelVariants: procedure
    .input(z.object({ modelId: z.string().nonempty() }))
    .query(async (opts) => {
      const { modelId } = opts.input;

      const products = await prisma.product.findMany({
        where: { modelId },
      });

      return products;
    }),
});

export type productRouter = typeof productRouter;
