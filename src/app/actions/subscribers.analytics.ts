"use server";

import { generateAnalyticsData } from "@/shared/utils/analytics.generator";
import Subscriber from "../models/subscribe.model";

export const subscribersAnalytics = async () => {
  try {
    const subscribers = await generateAnalyticsData(Subscriber);
    return subscribers;
  } catch (error) {
    console.log(error);
  }
};
