"use server";

import connectDB from "@/shared/libs/db";
import { currentUser } from "@clerk/nextjs/server";
import Membership from "../models/membership.model";

export const getMembership = async () => {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user) {
      return null;
    }
    const membership = await Membership.findOne({ userId: user.id });
    return membership;

  } catch (error) {
    console.error("Error fetching membership:", error);
    throw new Error("Could not fetch membership");
  }
};
