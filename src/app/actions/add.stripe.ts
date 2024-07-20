"use server";
import connectDB from "@/shared/libs/db";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";
import Membership from "../models/membership.model";

export const addStripe = async (): Promise<void> => {
  try {
    await connectDB();

    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }

    const membership = await Membership.findOne({ userId: user.id });
    if (membership) {
      return;
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key not found in environment variables");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const customer = await stripe.customers.create({
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
    });

    await Membership.create({
      userId: user.id,
      stripeCustomerId: customer.id,
      plan: "LAUNCH",
    });

  } catch (error) {
    console.error("Error adding Stripe customer:", error);
  }
};
