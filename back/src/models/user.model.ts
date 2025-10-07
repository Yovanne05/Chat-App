import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    pseudo: string;
    username: string;
    email: string;
    password: string;
    friends: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        pseudo: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);
