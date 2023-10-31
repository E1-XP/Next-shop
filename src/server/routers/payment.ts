import { z } from "zod";
import { getServerSession } from "next-auth";

import { procedure, router } from "./../trpc";
import { stripe } from "./../stripe";
import Stripe from "stripe";

export const paymentRouter = router({
  getPrices: procedure
    .input(
      z.object({
        stripeId: z.union([
          z.string().nonempty(),
          z.array(z.string().nonempty()),
        ]),
      })
    )
    .query(async (opts) => {
      const { stripeId } = opts.input;

      const getProductPrices = async (productId: string) => {
        const items = await stripe.prices.list({
          product: productId,
          active: true,
        });

        return items.data;
      };

      if (Array.isArray(stripeId)) {
        const productPrices = await stripeId.reduce(async (acc, id) => {
          const awaitedAcc = await acc;
          const data = await getProductPrices(id);

          return [...awaitedAcc, ...data];
        }, Promise.resolve([] as Stripe.Price[]));

        return productPrices;
      } else return await getProductPrices(stripeId);
    }),
  checkout: procedure
    .input(
      z.object({
        items: z.array(
          z.object({
            price: z.string().nonempty(),
            quantity: z.number().gt(0),
          })
        ),
        currency: z.string().nonempty(),
        locale: z.string().nonempty(),
        stripeShippingOptionId: z.string().nonempty(),
      })
    )
    .mutation(async (opts) => {
      const authSession = await getServerSession();

      const baseUrl = process.env.BASE_URL!;
      const isUSD = opts.input.currency == "usd";

      const session = await stripe.checkout.sessions.create({
        line_items: opts.input.items,
        mode: "payment",
        currency: opts.input.currency,
        locale: opts.input.locale as Stripe.Checkout.Session.Locale,
        payment_method_types: isUSD ? ["card"] : ["blik", "card"],
        customer_email: authSession?.user?.email,
        submit_type: "pay",
        shipping_address_collection: {
          allowed_countries: ["US", "PL"],
        },
        shipping_options: [
          { shipping_rate: opts.input.stripeShippingOptionId },
        ],
        success_url: `${baseUrl}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/cart/rejected`,
      });

      return session;
    }),
});

export type paymentRouter = typeof paymentRouter;
