import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    referralLink: string;
    referredBy?: string;
    referrals: number;
    waitlistPosition: number;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    referralLink: { type: String, required: true },
    referredBy: { type: String },
    referrals: { type: Number, default: 0 },
    waitlistPosition: { type: Number, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
