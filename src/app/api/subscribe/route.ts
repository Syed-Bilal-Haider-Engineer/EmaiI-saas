import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/shared/libs/db";
import Subscriber from "@/app/models/subscribe.model";
import { validateEmail } from "@/shared/utils/ZeroBounce";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();
    const apiKey = data.apiKey;
    const decoded: any = jwt.verify(apiKey, process.env.JWT_SECRET_KEY!);

    await connectDB();
    const isSubscriberExist = await Subscriber.findOne({
      email: data.email,
      newsLetterOwnerId: decoded?.user?.id,
    });

    if (isSubscriberExist) {
      return NextResponse.json({ error: "Email already exists!" }, { status: 400 });
    }

    const validationResponse = await validateEmail({ email: data.email });
    if (validationResponse.status === "invalid") {
      return NextResponse.json({ error: "Email not valid!" }, { status: 400 });
    }

    const subscriber = await Subscriber.create({
      email: data.email,
      newsLetterOwnerId: decoded?.user?.id,
      source: "By API",
      status: "Subscribed",
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
