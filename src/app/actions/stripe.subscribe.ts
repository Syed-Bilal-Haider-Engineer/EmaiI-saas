"use server";
import Stripe from "stripe";
import Membership from "../models/membership.model";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in the environment variables.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export const stripeSubscribe = async ({
  price,
  userId,
}: {
  price: string;
  userId: string;
}) => {
  try {
    const user = await Membership.findOne({ userId });

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: user.stripeCustomerId,
      line_items: [
        {
          price,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/error`,
      subscription_data: {
        metadata: {
          payingUserId: userId,
        },
      },
    });

    if (!checkoutSession.url) {
      throw new Error("Could not create checkout session!");
    }

    return { url: checkoutSession.url };
  } catch (error:any) {
    console.error("Error in stripeSubscribe:", error);
    return {
      message: error?.message || "An error occurred while creating the checkout session.",
    };
  }
};
