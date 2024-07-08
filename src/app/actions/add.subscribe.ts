"use server";

import connectDB from "@/shared/libs/db";
import { clerkClient } from "@clerk/nextjs/server";
import Subscriber from "../models/subscribe.model";
import { validateEmail } from "@/shared/utils/ZeroBounce";


export const subscribe = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  try {
    await connectDB();

    // first we need to fetch all users
    const allUsers:any= await clerkClient.users.getUserList();

    // now we need to find our newsletter owner
    const newsletterOwner = allUsers.find((i:any) => i.username === username);

    if (!newsletterOwner) {
      throw Error("Username is not vaild!");
    }

    // check if subscribers already exists
    const isSubscriberExist = await Subscriber.findOne({
      email,
      newsLetterOwnerId: newsletterOwner?.id,
    });

    if (isSubscriberExist) {
      return { error: "Email already exists!" };
    }

    // Validate email
    const validationResponse = await validateEmail({ email });
    if (validationResponse.status === "invalid") {
      return { error: "Email not valid!" };
    }

    // Create new subscriber
    const subscriber = await Subscriber.create({
      email,
      newsLetterOwnerId: newsletterOwner?.id,
      source: "Saas email website",
      status: "Subscribed",
    });
    return subscriber;
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while subscribing." };
  }
};