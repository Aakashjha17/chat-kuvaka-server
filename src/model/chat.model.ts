import mongoose from "mongoose";

interface IChat extends mongoose.Document {
  name: string;
  text: string;
}

const chatSchema = new mongoose.Schema<IChat>(
  {
    name: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model<IChat>("Chat", chatSchema);
export default chatModel;
