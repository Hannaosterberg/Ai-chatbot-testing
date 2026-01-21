import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant", "system"], required: true },
    content: { type: String, required: true }
  },
  { _id: false }
);

const ChatLogSchema = new mongoose.Schema(
  {
    provider: { type: String, default: "mock" },
    messages: { type: [MessageSchema], required: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ChatLog = mongoose.model("ChatLog", ChatLogSchema);
