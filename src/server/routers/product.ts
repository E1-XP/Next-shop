import { z } from "zod";

import { procedure, router } from "./../trpc";
import prisma from "@/../prisma/client";
import { Prisma } from "@prisma/client";

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
        perPage: z.number().gte(1).optional(),
        page: z.number().gte(1).optional(),
        order: z
          .string()
          .regex(/(?:asc|desc)/i)
          .toLowerCase()
          .optional(),
      })
    )
    .query(async (opts) => {
      const { order, query, perPage, page } = opts.input;

      const fullNameInQuery = query?.split(" - ");
      const brandProvided = fullNameInQuery ? fullNameInQuery[0] : undefined;
      const nameProvided = fullNameInQuery ? fullNameInQuery[1] : undefined;

      const where: Prisma.ProductWhereInput = {
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
      };

      const whereCaseFullNameQuery: Prisma.ProductWhereInput = {
        AND: [
          {
            name: {
              contains: nameProvided,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: brandProvided,
              mode: "insensitive",
            },
          },
        ],
      };

      const determineWhereVariant =
        nameProvided && brandProvided ? whereCaseFullNameQuery : where;

      const [count, products] = await prisma.$transaction([
        prisma.product.count(
          query ? { where: determineWhereVariant } : undefined
        ),
        prisma.product.findMany({
          where: query ? determineWhereVariant : undefined,
          orderBy: { name: order === "asc" ? "asc" : "desc" },
          take: perPage,
          skip: perPage ? (page ?? 0) * perPage - perPage : undefined,
        }),
      ]);

      return { products, total: count, page };
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
