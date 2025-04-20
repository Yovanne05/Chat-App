import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema: Schema = new Schema(
    {
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Message ||
mongoose.model<IMessage>("Message", messageSchema);
