import { z } from "zod";
import Stripe from "stripe";
import { getServerSession } from "next-auth";

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
        currency: z.string().nonempty(),
        stripeShippingOptionId: z.string().nonempty(),
      })
    )
    .mutation(async (opts) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2023-10-16",
      });
      const authSession = await getServerSession();

      const baseUrl = process.env.BASE_URL!;

      const session = await stripe.checkout.sessions.create({
        line_items: opts.input.items,
        mode: "payment",
        currency: opts.input.currency,
        payment_method_types: ["blik", "card"],
        customer_email: authSession?.user?.email,
        submit_type: "pay",
        shipping_address_collection: {
          allowed_countries: ["US", "PL"],
        },
        shipping_options: [
          { shipping_rate: opts.input.stripeShippingOptionId },
        ],
        success_url: `${baseUrl}/cart?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/cart?canceled=true`,
      });

      return session;
    }),
});

export type paymentRouter = typeof paymentRouter;
