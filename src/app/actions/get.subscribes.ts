"use server";

import connectDB from "@/shared/libs/db";
import Subscriber,{SubscriberDocument} from "../models/subscribe.model";

export const getSubscribers = async ({
  newsLetterOwnerId,
}: {
  newsLetterOwnerId: string;
}):Promise<SubscriberDocument[]> => {
  try {
    await connectDB();

    const subscribers = await Subscriber.find({
      newsLetterOwnerId,
    });
    return subscribers;
  } catch (error) {
    console.log(error);
    throw error
  }
};
