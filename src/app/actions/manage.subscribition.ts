"use server";
import connectDB from "@/shared/libs/db";
import Stripe from "stripe";

interface ManageSubscriptionProps {
  customerId: string;
}

export const manageSubscription = async ({
  customerId,
}: ManageSubscriptionProps): Promise<string | undefined> => {
  try {
    await connectDB();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2024-06-20",
    });

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dashboard`,
    });

    return portalSession.url;
  } catch (error) {
    console.error("Error managing subscription:", error);
    throw new Error("Failed to manage subscription. Please try again later.");
  }
};
