import connectDB from "@/shared/libs/db";
import Email from "../models/email.model";
interface EmailData {
  title: string;
  content: string;
  newsLetterOwnerId: string;
}

export const saveEmail = async ({
  title,
  content,
  newsLetterOwnerId,
}: EmailData): Promise<{ message: string }> => {
  try {
    // Connect to the database
    await connectDB();
    let email = await Email.findOne({ title, newsLetterOwnerId });

    if (email) {
      // If email exists, update its content
      await Email.findByIdAndUpdate(email._id, { content });
      return { message: "Email updated successfully!" };
    } else {
      // If email does not exist, create a new email entry
      await Email.create({
        title,
        content,
        newsLetterOwnerId,
      });
      return { message: "Email saved successfully!" };
    }
  } catch (error) {
    console.error("Error saving email:", error);
    throw new Error("Failed to save email"); 
  }
};
