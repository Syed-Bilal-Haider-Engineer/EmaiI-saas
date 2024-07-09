import { Document, model, Schema } from 'mongoose';

export interface SubscriberDocument extends Document {
  email: string;
  newsLetterOwnerId: string;
  createdAt: Date;
  status: string;
  // Add more fields as per your schema
}

// Define Mongoose schema
const subscriberSchema = new Schema<SubscriberDocument>({
  email: { type: String, required: true },
  newsLetterOwnerId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' }
});


const Subscriber = model<SubscriberDocument>('Subscriber', subscriberSchema);

export default Subscriber;
