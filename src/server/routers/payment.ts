import { z } from "zod";
import Stripe from "stripe";

import { procedure, router } from "./../trpc";

export const paymentRouter = router({
  checkout: procedure
    .input(
      z.object({
        items: z.array(
          z.object({
            price: z.string().nonempty(),
            quantity: z.number().gt(0),
          })
        ),
      })
    )
    .mutation(async (opts) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2023-10-16",
      });

      const baseUrl = process.env.BASE_URL!;

      const session = await stripe.checkout.sessions.create({
        line_items: opts.input.items,
        mode: "payment",
        payment_method_types: ["blik", "card"],
        shipping_address_collection: {
          allowed_countries: ["US", "PL"],
        },
        shipping_options: [
          {
            shipping_rate: "shr_1O3GQzEl9PJWMc3quF2i76bS",
          },
          { shipping_rate: "shr_1O3GRzEl9PJWMc3q2qdK1nc3" },
        ],
        success_url: `${baseUrl}/cart?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/cart?canceled=true`,
      });

      return session;
    }),
});

export type paymentRouter = typeof paymentRouter;
